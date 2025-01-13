import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        title: {type:String, required:true},
        content: {type:String, required:true},
        category: {type:String, required:true},
        author: {type:String, required:true},
        date: {type:Date, required:true},
        rating: {type:Number, required:true}
    },
);

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;