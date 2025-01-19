import { findBlog } from "../api/blogAPI"
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { findUser } from "../api/userAPI"
import {ObjectId} from 'mongoose'
import { useCallback } from "react"
import * as jwt_decode from "jwt-decode"

function ReadBlog(){
    const [blog, setBlog] = useState({})   
    const [author, setAuthor] = useState('')
    const [user, setUser] = useState({})
    const [showConfirm, setShowConfirm] = useState(false);

    const isAuthor = blog.author == user.user?._id;

    let params = useParams()
    let id = params.id
    const navigate = useNavigate()

    const getAuthor = useCallback(async (AuthorId) => {
        let id = new mongoose.Types.ObjectId(AuthorId)
        let author = await findUser(id)

        setAuthor(author.firstName.concat(" ",author.lastName))
    },[])

    useEffect(() =>{
        async function loadPost(){
            let post = await findBlog(id)
            if (post){
                setBlog(post)
                await getAuthor(post.author)
            }
        }
        loadPost()
    }, [id, getAuthor])


    useEffect(() => {
        async function loadUserData(){
            const token = sessionStorage.getItem("User")
            const decodedUser = jwt_decode.jwtDecode(token)
            setUser(decodedUser)
        }
        loadUserData()
    }, [])

    async function handleDelete(postId){
        console.log('Post deleted')
        navigate(-1)
    }


    return(
        <div className="flex flex-col m-40 justify-between ">
            <div className="flex md:flex-row flex-col md:justify-between justify-start">
                <button className="bg-blue-950 font-bold text-green-500 rounded-full w-32 m-2" onClick={() => navigate(-1)}>BACK</button>
                {isAuthor && <button className=" bg-red-500 text-white font-bold rounded-full w-32 h-12 m-2" onClick={() => setShowConfirm(true)}>DELETE</button>}
            </div>
        
            <h1 className="text-sky-950 font-bold text-3xl m-5 self-center">{blog.title}</h1>
            <h1 className="text-sky-950 font-semibold text-base self-center">By: {author}</h1>
            <img src={blog.image} alt="blog-image" className="object-contain m-5"/>
            <h1 className="text-sky-950 font-base m-5 text-lg">{blog.content}</h1>

            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg flex flex-col">
                        <h2 className="font-bold text-sm text-red-500 self-start m-4">Delete Plume?</h2>
                        <hr className="mr-4 ml-4"></hr>
                        <h2 className="font-semibold text-sky-950 text-medium m-8 self-center">Are you sure you want to delete this plume?</h2>
                        <h2 className="font-medium text-red-500 text-sm italic self-center -mt-6">WARNING: This Plume can not be recovered.</h2>
                        <div className="flex justify-around m-8">
                            <button className="bg-red-500 text-white px-4 py-2 rounded-full w-32" onClick={() => handleDelete(blog._id)}>DELETE</button>
                            <button className="bg-gray-500 text-white px-4 py-2 rounded-full w-32" onClick={() => setShowConfirm(false)}>CANCEL</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ReadBlog


