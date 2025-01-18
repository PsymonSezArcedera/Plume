import { findBlog } from "../api/blogAPI"
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { findUser } from "../api/userAPI"

function ReadBlog(){
    const [blog, setBlog] = useState({})   
    const [author, setAuthor] = useState('')

    let params = useParams()
    let id = params.id
    const navigate = useNavigate()

    useEffect(() =>{
        async function loadPost(){
            let post = await findBlog(id)
            if (post){
                setBlog(post)
                // let author = await findUser(blog?.author)
                // setAuthor(author.firstName.concat(" ",author.lastName))
            }
        }
        loadPost()

    }, [])

    return(
        <div className="flex flex-col m-40 justify-between ">
            <button className="self-start bg-blue-950 font-black text-green-500 rounded-full w-32" onClick={() => navigate(-1)}>BACK</button>
            <h1 className="text-sky-950 font-bold text-3xl m-5 self-center">{blog.title}</h1>
            <h1 className="text-sky-950 font-semibold text-base self-center">By: {author}</h1>
            <img src={blog.image} alt="blog-image" className="object-contain m-5"/>
            <h1 className="text-sky-950 font-base m-5 text-lg">{blog.content}</h1>
        </div>
    )
}

export default ReadBlog