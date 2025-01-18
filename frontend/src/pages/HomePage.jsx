import { useState, useEffect } from "react";
import { getBlogs } from "../api/blogAPI";
import BlogTile from "../components/BlogTile";

function HomePage(){
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        async function loadBlogs(){
            let blogs = await getBlogs()
            if(blogs){
                setBlogs(blogs) 
            }
        }
        loadBlogs()
    }, [])

    return(
        <div className="m-40 flex flex-col ">
            <div className="flex flex-row self-center text-center">
                <h1 className="font-bold text-5xl text-sky-950 m-2 ">Browse the latest </h1>
                <h1 className="font-bold text-5xl text-green-500 m-2 ">Plumes</h1>
            </div>

            {blogs.map((blog) => {
                return (
                    <>
                        <BlogTile blog={blog}/>
                    </>
                )
            })}
        </div>
    )
}

export default HomePage