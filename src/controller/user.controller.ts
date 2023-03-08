import {prisma} from '../config/db';
import {Request, Response} from 'express'
import * as argon2 from "argon2";
import * as jwt from 'jsonwebtoken'

//Create user
export const Register = async (req:Request, res:Response)=>{
    let hash = await argon2.hash(req.body.password)

    try{
        let user = await prisma.user.create({
            data:{
                username:req.body.username,
                password:hash,
                email:req.body.email,
                role:req.body.role,
            }
        })
        res.json({'msg':'user created', 'user':user})
    }catch(err){
        console.log(err);
        
    }
}
//Login 
export const login = async (req: Request, res:Response)=>{
    try{
        let user= await prisma.user.findUnique({
            where:{
                email: req.body.email
            }
        })
        if(!user){
            return res.status(400).json({Error:"wrong email"})
        }else{
            let checkPass= await argon2.verify(user.password, req.body.password)
            if(checkPass){
                let token = jwt.sign({
                    id: user.id,
                    username: user.username,
                    role:user.role
                }, process.env.API_SECRET as string, {expiresIn:'2h'})
                return res.status(200).json({
                    message:`welcome back ${user.username}`,
                    token: token})
            }else{
                return res.status(400).json({Error:"wrong password"})
            }
        }
    }catch(e){
        res.status(500).json({"Error":e})
    }
}

//Get all users
export const findAllUser = async (req:Request, res:Response)=>{
    try{
        let users = await prisma.user.findMany()
        res.json(users)
    }catch(err){
        console.log(err);
    }
}

//Get user
export const findUser = async (req: Request, res: Response)=> {
    try {
        let user = await prisma.user.findFirst({
            where: {
                id: req.params.id
            }
        })
        if(! user) {
            res.json({"msg": "user not found"});
        } else {
            res.json({"msg": `Welcome back ${user.username}`, user});
        }
    } catch (error) {
        res.json({"msg": error})
    }
    
}