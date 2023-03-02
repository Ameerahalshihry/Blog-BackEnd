import {prisma} from '../config/db';
import {Request, Response} from 'express'

//Create a post for the user
export const createPost = async (req:Request, res:Response)=>{
    try{
        let post = await prisma.post.create({
            data: req.body
        })
        res.json({'msg':'post created', 'post':post})
    }catch(err){
        console.log(err);
        
    }
}

//Get all posts
export const findAllPosts= async (req:Request, res:Response)=>{
    let posts = await prisma.post.findMany()
    console.log(posts);
    res.json(posts)
}

//Get all posts for user
export const findUserPosts= async (req:Request, res:Response)=>{
    try{
        let posts = await prisma.post.findMany({
            where:{
                userId: req.params.id
            },
            select: {
                title: true,
                createdDate: true,
                user: {
                    select: {
                        username: true,
                        email: true,
                        role: true
                    }
                }
            }
        })
        if(posts) {
            res.json(posts)
        } else {            
            res.json({"msg": "no posts"})
        }
    }catch(err){
        console.log(err); 
    }
}

//update Post
export const updatePost = async (req:Request, res:Response)=>{
    try{
        let post = await prisma.post.update({
            where:{
                id: req.params.id
            },
            data: req.body
        })
        res.json({'msg':'post updated', 'post':post})
    }catch(err){
        console.log(err);
    }
}

//Delete all posts for user
export const deleteUserPosts = async (req:Request, res:Response)=>{
    try{
        let posts = await prisma.post.deleteMany({
            where:{
                userId: req.params.id
            }
        })
        res.json({'msg':'all posts deleted', 'posts':posts})
    }catch(err){
        console.log(err);
    }
}

//Delete post
export const deletePost = async (req:Request, res:Response)=>{
    try{
        let post = await prisma.post.delete({
            where:{
                id: req.params.id
            }
        })
        res.json({'msg':'post deleted', 'post':post})
    }catch(err){
        console.log(err);
    }
}