import Fullblog from "../components/Fullblog"
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom"

const Blog = () => {

  const {id}=useParams()

  const {loading,blog}= useBlog({
    id:id||""
  })
  if (loading) {
    return <div>
      loading...
    </div>
  }
  if (!blog) {
    return <div>Error: Blog not found.</div>;
  }
  return (
    <div>
      <Fullblog blog={blog}/>
    </div>
  )
}

export default Blog
