import { useState } from "react"
import { createBlog } from "../api/blogAPI"
function CreatePage(){

    const [title,setTitle] = useState("")
    const [introduction, setIntroduction] = useState("")
    const [content, setContent] = useState("")
    const [category, setCategory] = useState("")
    const [image, setImage] = useState("")


    async function handleSubmit(){
        let submitPost = {
            title: title,
            introduction: introduction,
            content: content,
            category: category,
            image: image,
            date: new Date()
        }

        await createBlog(submitPost)
    }

    function handleReset(){
        setTitle("")
        setIntroduction("")
        setContent("")
        setCategory("")
        setImage("")

    }

    return(
        <form className="m-40 flex flex-col md:items-start items-center" onSubmit={handleSubmit}>
            <label className="font-bold text-sky-950 m-2">TITLE</label>
            <input className="bg-sky-100 w-96 rounded-full p-4 text-sky-950" name="title" placeholder="title" onChange={(e) => setTitle(e.target.value)} value={title} maxLength={100} required/>
            <hr className="m-4"></hr>
            <label className="font-bold text-sky-950 m-2">INTRODUCTION</label>
            <input className="bg-sky-100  w-96 rounded-full p-4 text-sky-950" name="introduction" placeholder="introduction" onChange={(e) => setIntroduction(e.target.value)} value={introduction} maxLength={200} required/>
            <hr className="m-4"></hr>
            <label className="font-bold text-sky-950 m-2">CATEGORY</label>
            <input className="bg-sky-100  w-96 rounded-full p-4 text-sky-950" name="category" placeholder="category" onChange={(e) => setCategory(e.target.value)} value={category} maxLength={100} required/>
            <hr className="m-4"></hr>
            <label className="font-bold text-sky-950 m-2">IMAGE LINK</label>
            <input className="bg-sky-100  w-96 rounded-full p-4 text-sky-950" name="image" placeholder="image link" onChange={(e) => setImage(e.target.value)} value={image} maxLength={100} required/>
            <label className="font-bold text-sky-950 self-center m-10">CONTENT</label>
            <textarea className="self-center bg-sky-100 w-96 md:w-full rounded-full p-4 m-2" name="content" placeholder="Tell us your story..." onChange={(e) => setContent(e.target.value)} value={content} maxLength={5000} required/>
            
            <div className="flex flex-col md:flex-row self-center">
                <button className="self-center m-10 bg-green-500 text-lg text-sky-950 p-4 rounded-full font-black w-32" type="submit">POST</button>
                <button className="self-center m-10 bg-sky-950 text-lg text-green-500 p-4 rounded-full font-black w-32" type="button" onClick={handleReset}>CANCEL</button>
            </div>

        </form>
    )
}

export default CreatePage