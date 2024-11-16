import { createBlogInput, updateBlogInput } from "@ishaan112/medium-pro";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECERET: string;
    };
    Variables: {
        userId: string;
    };
}>();

blogRouter.use('/*', async (c, next) => {
    const header = c.req.header("Authorization") || "";
    if (!header) {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }

    const token = header.split(" ")[1];

    try {
        const res: any = await verify(token, c.env.JWT_SECERET);
        if (res.id) {
            c.set('userId', res.id); 
            await next();
        } else {
            c.status(403);
            return c.json({ error: "unauthorized" });
        }
    } catch (err) {
        c.status(403);
        return c.json({ error: "invalid token" });
    }
});

blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const {success} = createBlogInput.safeParse(body)
    if (!success) {
        c.status(403)
        return c.json({error:"Invalid Inputs"})
    }
    const userId = c.get("userId"); 
    if (!userId) {
        c.status(401);
        return c.json({ error: "Unauthorized" });
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: userId,
        },
    });
    return c.json({ id: blog.id });
});
blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body)
    if (!success) {
        c.status(403)
        return c.json({error:"Invalid Inputs"})
    }
    const userId = c.get("userId");
    if(!userId){
        c.status(401);
        return c.json({ error: "Unauthorized" });
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const blog = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
            },
        });
        return c.json({ id: blog.id });
    }catch(error) {
        c.status(403);
        return c.json({ error: "Please provide valid information" });
    }
});

blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany();
    return c.json(blogs);
});

blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.findUnique({
        where: {
            id: c.req.param("id"),
        },
    });

    if (!blog) {
        c.status(404);
        return c.json({ error: "No blog found" });
    }

    return c.json(blog);
});
