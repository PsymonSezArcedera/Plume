import express from "express";
import expressAsyncHandler from 'express-async-handler'
import Blog from "../models/blogModel.js";

const blogRouter = express.Router();

//#1 GET ALL BLOGS
blogRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
        const blogs = await Blog.find();
        res.send(blogs);
    })
);

//#2 FIND BLOG BY ID
blogRouter.get(
    '/:id',
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
    expressAsyncHandler(async (req,res) => {
        const newBlog = new Blog({
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            author: req.body.author,
            date: req.body.date,
            rating: 0
        });
        const blog = await newBlog.save();
        res.send({message: 'Blog created', blog});
    })
);

//#4 UPDATE A BLOG
blogRouter.put(
    '/:id',
    expressAsyncHandler(async(req,res) => {
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId)
        if(blog){
            blog.title = req.body.title;
            blog.content = req.body.content;
            blog.category = req.body.category;
            blog.author = req.body.author;
            blog.date = req.body.date;
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

export default blogRouter