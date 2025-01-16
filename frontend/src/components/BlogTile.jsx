import { useState } from "react";

function BlogTile({blog}){

    const date = new Date(blog.date);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const formattedDate = `${monthNames[date.getMonth()]} ${date.getDate().toString().padStart(2, '0')}, ${date.getFullYear()}`;
    
    return(
        <div className="flex flex-col shadow-lg w-96 m-20 rounded-3xl cursor-pointer" >
            <img src={blog.image} className="w-96 h-72 object-cover rounded-3xl" alt="blog-image"></img>
            <div className="flex flex-col items-center">
                <h1 className="text-xl font-bold text-sky-950 bg-green-500 rounded-full w-fit text-center self-center p-2 m-4">{blog.title}</h1>
                <h1 className="text-base font-normal text-sky-950 m-2">{blog.content}</h1>
            </div>
            <div className="flex flex-row justify-between m-4 font-light text-sm text-sky-950 content-center text-center ">
                <h1 className="w-1/4">{blog.author}</h1>
                <h1 className="text-green-500 font-bold bg-sky-950 w-2/4 p-2 rounded-full">{blog.category}</h1>
                <h1 className="w-1/4 ">{formattedDate}</h1>
            </div>


        
        </div>
    )
}

export default BlogTile