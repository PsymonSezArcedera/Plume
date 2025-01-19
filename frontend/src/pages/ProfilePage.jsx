import { useState, useEffect } from "react"
import { getBlogs } from "../api/blogAPI";
import BlogTile from "../components/BlogTile";
import * as jwt_decode from "jwt-decode"
import logo from "../assets/plume_logo.png"

function ProfilePage(){
    const [user, setUser] = useState({})

    useEffect(() => {
        async function loadUserData(){
            const token = sessionStorage.getItem("User")
            const decodedUser = jwt_decode.jwtDecode(token)
            setUser(decodedUser)
        }
        loadUserData()
    }, [])
    
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        async function loadBlogs(){
            let blogs = await getBlogs()
            if(blogs){
                blogs.filter((blog) => blog.author == user._id)
                setBlogs(blogs) 
            }
        }
        loadBlogs()
    }, [])

    return(
        <div className="flex flex-col m-40">

            <div className="flex flex-col self-center m-10 w-full rounded-lg p-10 text-sky-950 shadow-lg text-center">
                <img src="https://cdn-icons-png.flaticon.com/512/9203/9203764.png" alt="profile-image" className="w-40 h-40 self-center" />
                <h2 className="text-4xl font-bold">{user.user?.firstName.concat(" ", user.user?.lastName)}</h2>
                <h2 className="text-base font-normal ">{user.user?.email}</h2>
                <h2 className="text-base font-normal">Posts: {blogs.length}</h2>
                <button className="mt-10 bg-sky-950 text-green-500 font-bold rounded-full p-2 w-64 self-center">SIGN OUT</button>
            </div>

            <img src={logo} alt="logo" className="w-16 h-16 self-center mt-10" /> 
            <div className="flex md:flex-row flex-col self-center">
                <h1 className="text-sky-950 font-bold text-5xl m-2">My</h1>
                <h1 className="text-green-500 font-bold text-5xl m-2">Plumes</h1>
            </div>
            <div className="flex flex-row self-center flex-wrap justify-center">
                {blogs.map((blog) => {
                    return (
                        <>
                            <BlogTile blog={blog}/>
                        </>
                    )
                })}
            </div>
        </div>
    )
}

export default ProfilePage