import { Blog } from "../hooks"
import Appbar from "./Appbar"

const Fullblog = ({blog}:{blog:Blog}) => {
  return (
    <div>
        <Appbar/>
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-9 max-w-screen-xl">
            <div className=" col-span-8">
                <div className="text-3xl font-extrabold">
                    {blog.title}
                </div>
                <div className="text-slate-500 pt-4">
                    Posted on 2nd Dec 2023
                </div>
                <div className="pt-2">
                    {blog.content}
                </div>
            </div>
                <div className=" col-span-4 ">
                    Author
                    <div className="text-xl font-bold">
                        {blog.author.name ||"Anonymus"}
                    </div>
                    <div className="pt-2 text-slate-500">
                        Random text phrase about the author's ability to grab the user attention
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Fullblog
