import {prisma} from '../config/db';
import {Request, Response} from 'express'

//Create user
export const Register = async (req:Request, res:Response)=>{
    try{
        let user = await prisma.user.create({
            data: req.body
        })
        res.json({'msg':'user created', 'user':user})
    }catch(err){
        console.log(err);
        
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