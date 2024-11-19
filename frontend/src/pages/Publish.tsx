import axios from "axios"
import Appbar from "../components/Appbar"
import { BACKEND_URL } from "../config"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

const Publish = () => {
  const [title,setTitle] = useState("")
  const [content,setContent] = useState("")
  const navigate = useNavigate()
  return (
    <div>
      <Appbar />
      <div className="flex justify-center w-full pt-8">
        <div className="max-w-screen-lg w-full">
          <input onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none p-2" type="text" />
          <TextEditor
            onChange={(e)=>{
              setContent(e.target.value)
            }}
          />
          <button onClick={async()=>{
              const res = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
              title,
              content
            },
            {
              headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
              }
            });
            navigate(`/blog/${res.data.id}`)
          }} type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
        Publish post
      </button>
        </div>
        <div>
        </div>
      </div>
    </div>
  )
}

function TextEditor({onChange}:{onChange:(e:ChangeEvent<HTMLTextAreaElement>)=>void}) {
  return (
    <form>
      <div className="max-w-screen-lg px-4 py-2 bg-white rounded-b-lg">
        <label className="sr-only">Publish post</label>
        <textarea id="editor" onChange={onChange} className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none p-2" placeholder="Write an article..." required/>
    </div>
    </form>
  )

}

export default Publish
