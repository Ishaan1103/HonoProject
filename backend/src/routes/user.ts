import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import {signInInput, signupInput} from "@ishaan112/medium-pro"

export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECERET:string
    }
}>();

userRouter.post('/signup', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const { success } = signupInput.safeParse(body)
    if (!success) {
        c.status(403)
        return c.json({error:"Input not correct"})
    }
    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name
            }
        })

        const token = await sign({ id: user.id }, c.env.JWT_SECERET)

        return c.json({
            jwt: token
        })
    } catch (e) {
        c.status(403)
        return c.json({ error: "error while signup" })
    }
})
userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const {success} = signInInput.safeParse(body)
    if (!success) {
        c.status(403)
        return c.json({error:"Please Validate the Inputs"})
    }
    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
            password: body.password
        }
    })
    if (!user) {
        c.status(403)
        return c.json({ error: "Invalid credentials" });
    }
    const jwt = await sign({ id: user.id }, c.env.JWT_SECERET)
    return c.json({ jwt })
})