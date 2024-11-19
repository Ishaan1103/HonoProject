import { Link, useNavigate } from "react-router-dom"

const Appbar = () => {
  const navigate = useNavigate()
    function logout(){
      localStorage.removeItem("token")
      navigate('/signin')
    }
  return (
    <div className="border-b flex justify-between items-center px-10 py-4">
      <Link to={'/blogs'}>
      <div className="flex ">
        Medium
      </div>
      </Link>
      <div className="flex items-center space-x-4">
        <Link to={'/publish'}>
        <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 
        focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Publish</button>
        </Link>
        <div>
        <button onClick={logout} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Logout</button>
        </div>
      </div> 
    </div>
  )
}



export default Appbar
