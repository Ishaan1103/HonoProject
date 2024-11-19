import { SignupInput } from "@ishaan112/medium-pro";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { BACKEND_URL } from "../config";

const Auth = ({ type }: { type: "signup" | 'signin' }) => {
    const navigate = useNavigate();
    const [postInput,setPostInput] = useState<SignupInput>({
        name:"",
        email:"",
        password:""
    })
    async function sendRequest (){
        try {
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/${type === 'signup'?'signup':'signin'}`,postInput)
            const jwt = res.data.jwt
            localStorage.setItem('token',jwt)
            navigate('/blogs')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="h-screen flex flex-col justify-center">
            <div className="flex justify-center">
                <div>
                <div className="px-10">
                    <div className="text-3xl font-extrabold">
                        {type=== 'signup' ? 'Create an account':'Login to account'}
                    </div>
                    <div className="text-xl text-slate-400">
                        {type==="signup"?'Already have an account?':'Crearte an account?'}<Link className="pl-2 underline" to={type === 'signup'?'/signin':'/signup'}>{type === 'signup'?'Login':'Singup'} </Link>
                    </div>
                </div>
                <div className="pt-4">
                {type==='signup'?<LabelledInput label="Name" placeholder="Ishaan Rana..." onChange={e=>{
                    setPostInput(c=>({
                        ...c,
                        name:e.target.value
                    }))
                }}/>:null}
                <LabelledInput label="Email" placeholder="ishaan@gamil.com" onChange={e=>{
                    setPostInput(c=>({
                        ...c,
                        email:e.target.value
                    }))
                }}/>
                <LabelledInput label="Password" type={"password"} placeholder="123456"onChange={e=>{
                    setPostInput(c=>({
                        ...c,
                        password:e.target.value
                    }))
                }}/>
                <button type="button" onClick={sendRequest} className="mt-3 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type==='signup'?'Signup':'Signin'}</button>
                </div>
                </div>
            </div>
        </div>
    )
}

interface LabelledInputType {
    label:string,
    placeholder:string,
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void;
    type?:string
}

function LabelledInput({ label, placeholder, onChange,type }:LabelledInputType) {
    return <div>
            <div>
                <label className="block mb-2 text-sm text-black font-semibold">{label}</label>
                <input onChange={onChange} type={type||"text"} className="mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
            </div>
    </div>
}

export default Auth
