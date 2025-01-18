import { useState, useEffect } from "react"
import { getBlogs } from "../api/blogAPI";
import BlogTile from "../components/BlogTile";
import logo from "../assets/plume_logo.png"

function FindPage(){
    const [search, setSearch] = useState("")
    const [blogs, setBlogs] = useState([])
    const [filtered, setFiltered] = useState([])

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

    useEffect(() => {
        setFiltered(
            blogs.filter(blog => 
                blog.category.toLowerCase().includes(search.toLowerCase())
            )
        )
    }, [search, blogs])

    return(
        <div className="flex flex-col m-40 justify-center ">
            <img src={logo} alt="logo" className="w-16 h-16 self-center" /> 
            <div className="flex md:flex-row flex-col self-center mb-10">
                <h1 className="text-sky-950 font-bold text-5xl m-2">Find</h1>
                <h1 className="text-green-500 font-bold text-5xl m-2">Plume</h1>
            </div>
            <div className="flex flex-row ">
                <input 
                    type="text" 
                    className="bg-gray-200 self-center p-4 md:w-full w-96 rounded-full text-sky-950"
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    placeholder="Search by category..."
                />
            </div>
            <div className="flex flex-row self-center flex-wrap justify-center">
            {filtered.map((blog) => {
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

export default FindPage
