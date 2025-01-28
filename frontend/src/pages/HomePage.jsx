import { useState, useEffect } from "react";
import { getBlogs } from "../api/blogAPI";
import BlogTile from "../components/BlogTile";
import logo from "../assets/plume_logo.png"

function HomePage(){
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        async function loadBlogs(){
            let blogs = await getBlogs()
            if(blogs){
                blogs.sort((r1,r2) => r2.rating - r1.rating)
                setBlogs(blogs) 
            }
        }
        loadBlogs()
    }, [])

    return(
        <div className="flex flex-col mt-20">
            <img src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZyUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D" className="h-64 object-cover "/>
            <div className="flex flex-col md:flex-row self-center text-center absolute m-20 text-5xl font-bold">
                <h1 className="text-sky-950 m-2 ">Browse The Latest </h1>
                <h1 className="text-green-700 m-2 ">Plumes</h1>
            </div>
            <hr className="m-10 w-10/12 self-center"></hr>
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

export default HomePage