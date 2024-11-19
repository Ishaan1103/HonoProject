import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"

export interface Blog {
        "content": string,
        "title": string,
        "id": string,
        "author": {
            "name": string
        }
}

export const useBlog = ({id}:{id:string})=>{
    const [loading,setLoading] = useState(true)
    const [blog,setBlog] = useState<Blog>()

    const token = `Bearer ${localStorage.getItem("token")}`

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers:{
                Authorization:token
            }
        })
        .then(res =>{
            setBlog(res.data)
            setLoading(false)
        }
        )
    },[id])
    return {
        loading,
        blog
    }
}

export const useBlogs = ()=>{
    const [loading,setLoading] = useState(true)
    const [blogs,setBlogs] = useState<Blog[]>([])

    const token = `Bearer ${localStorage.getItem("token")}`

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers:{
                Authorization:token
            }
        })
        .then(res =>{
            setBlogs(res.data)
            setLoading(false)
        }
        )
    },[])
    return {
        loading,
        blogs
    }
}