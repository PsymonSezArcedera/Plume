import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { findUser } from "../api/userAPI";

function BlogTile({blog}){
    const [author, setAuthor] = useState('')

    useEffect(() => {
        async function getAuthor(){
            let author = await findUser(blog.author)
            setAuthor(author.firstName.concat(" ",author.lastName))
        }
        getAuthor()
    }, [])

    const date = new Date(blog.date);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const formattedDate = `${monthNames[date.getMonth()]} ${date.getDate().toString().padStart(2, '0')}, ${date.getFullYear()}`;
    
    return(
        <Link to={`/readblog/${blog._id}`} className="flex flex-col border-2 w-96 rounded-md cursor-pointer m-10 transform transition duration-500 hover:scale-110">
            <img src={blog.image} className="w-96 h-72 object-cover rounded-md" alt="blog-image"></img>

            <div className="flex flex-col items-start m-4">
                <h1 className="text-sm font-bold text-green-700">{blog.category}</h1>
                <h1 className="text-xl text-blue-950 font-semibold mt-4 mb-4">{blog.title}</h1>
                <h1 className="text-sm font-light text-sky-950">{blog.introduction}</h1>
                <hr className="m-2 w-11/12"></hr>
                <div className="text-blue-950 ">
                    <h1 className="font-bold text-sm">{author}</h1>
                    <h1 className="text-xs">{formattedDate}</h1>
                </div>
            </div>

        </Link>
    )
}

export default BlogTile