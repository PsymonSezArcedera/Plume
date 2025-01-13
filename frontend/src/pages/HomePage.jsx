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
        <>
            {blogs.map((blog) => {
                return (
                    <>
                        <BlogTile blog={blog}/>
                    </>
                )
            })}
        </>
    )
}

export default HomePage