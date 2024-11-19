import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string,
    id: string
}

export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
    id
}: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`}>
            <div className="border-b border-slate-400 p-4 w-screen max-w-screen-md">
                <div className="flex">
                    {authorName} . {publishedDate}
                </div>
                <div className="text-xl font-semibold pt-2">
                    {title}
                </div>
                <div className="text-md font-thin">
                    {content.slice(0, 100) + "..."}
                </div>
                <div className="text-slate-500 text-sm font-thin pt-4 pb-2">
                    {`${Math.ceil(content.length / 100)} minute(s) read`}
                </div>
            </div>
        </Link>
    )
}