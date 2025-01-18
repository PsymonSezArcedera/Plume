import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { findUser } from "../api/userAPI";

function BlogTile({blog}){
    const [author, setAuthor] = useState([''])

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
        <Link to={`/readblog/${blog._id}`} className="flex flex-col shadow-lg w-96 rounded-3xl cursor-pointer m-20 transform transition duration-500 hover:scale-110">
            <h1 className="absolute -z-2 m-5 font-black text-sm text-sky-950 bg-green-500 rounded-full pr-4 pl-4 p-2 self-start">{blog.rating}/5</h1>
            <img src={blog.image} className="w-96 h-72 object-cover rounded-3xl" alt="blog-image"></img>
            <div className="flex flex-col items-center">
                <h1 className="text-xl font-bold text-sky-950 bg-green-500 rounded-full w-fit text-center self-center p-2 m-4">{blog.title}</h1>
                <h1 className="text-sm font-normal text-sky-950 m-4">{blog.introduction}</h1>
            </div>
            <div className="flex flex-row justify-between m-4 font-light text-sm text-sky-950 content-center text-center ">
                <h1 className="w-1/4 font-medium">{author}</h1>
                <h1 className="text-green-500 font-bold bg-sky-950 w-2/4 p-2 rounded-full">{blog.category}</h1>
                <h1 className="w-1/4 font-medium ">{formattedDate}</h1>
            </div>
        </Link>
    )
}

export default BlogTile