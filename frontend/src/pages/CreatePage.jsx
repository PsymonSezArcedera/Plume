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

    return(
        <form className="m-40 flex flex-col" onSubmit={handleSubmit}>
            <input name="title" placeholder="title" onChange={(e) => setTitle(e.target.value)} maxLength={100} required/>
            <input name="introduction" placeholder="introduction" onChange={(e) => setIntroduction(e.target.value)} maxLength={200} required/>
            <input name="category" placeholder="category" onChange={(e) => setCategory(e.target.value)} maxLength={100} required/>
            <input name="image" placeholder="image link" onChange={(e) => setImage(e.target.value)} maxLength={100} required/>
            <textarea name="content" placeholder="content" onChange={(e) => setContent(e.target.value)} maxLength={5000} required/>
            <button type="submit">POST</button>
        </form>
    )
}

export default CreatePage