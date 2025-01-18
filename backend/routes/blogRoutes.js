import express from "express";
import expressAsyncHandler from 'express-async-handler'
import Blog from "../models/blogModel.js";
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
dotenv.config({path: "../config.env"})
const blogRouter = express.Router();

//#1 GET ALL BLOGS
blogRouter.get(
    '/',
    verifyToken,
    expressAsyncHandler(async (req, res) => {
        const blogs = await Blog.find();
        res.send(blogs);
    })
);

//#2 FIND BLOG BY ID
blogRouter.get(
    '/:id',
    verifyToken,
    expressAsyncHandler(async (req, res) => {
        const blog = await Blog.findById(req.params.id);
        if(blog){
            res.send(blog);
        }
        else{
            res.status(404).send({message: 'Blog not found'})
        }
    })  
);

//#3 CREATE NEW BLOG
blogRouter.post(
    '/create',
    verifyToken,
    expressAsyncHandler(async (req,res) => {
        const newBlog = new Blog({
            title: req.body.title,
            introduction: req.body.introduction,
            content: req.body.content,
            category: req.body.category,
            author: req.body.user.user._id,
            date: req.body.date,
            image: req.body.image,
            rating: 0
        });
        const blog = await newBlog.save();
        res.send({message: 'Blog created', blog});
    })
);

//#4 UPDATE A BLOG
blogRouter.put(
    '/:id',
    verifyToken,
    expressAsyncHandler(async(req,res) => {
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId)
        if(blog){
            blog.title = req.body.title;
            blog.introduction = req.body.introduction;
            blog.content = req.body.content;
            blog.category = req.body.category;
            blog.author = req.body.author;
            blog.date = req.body.date;
            blog.image = req.body.image;
            blog.rating = req.body.rating;
            await blog.save();
            res.send({message: 'Blog updated'});
        }
        else{
            res.status(404).send({message: 'Blog not found'});
        }
    })
);

//#5 DELETE A BLOG
blogRouter.delete(
    '/:id',
    verifyToken,
    expressAsyncHandler(async(req, res) => {
        const blog = await Blog.findById(req.params.id);
        if(blog){
            await blog.remove();
            res.sendFile({message: 'Blog deleted'});
        }
        else{
            res.status(404).send({message: 'Blog not found'});
        }
    })
);

//#6 VERIFY LOGIN
function verifyToken(request, response, next){
    const authHeaders = request.headers["authorization"]
    const token = authHeaders && authHeaders.split(' ')[1]
    if(!token){
        return response.status(401).json({message: "Authentication token is missing"})
    }
    
    jwt.verify(token, process.env.SECRETKEY, (error, user) => {
        if(error){
            return response.status(403).json({message:"Invalid token"})
        }
        request.body.user = user
        next()
    })

}
export default blogRouter