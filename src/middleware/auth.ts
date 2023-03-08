import {NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
interface User{
    username: string 
    id: string
}
export const auth = (req:Request, res:Response, next: NextFunction) =>{
    try{
        let token = req.headers.authorization;
    
    if(!token){
        return res.status(403).json({"msg":"you are not authorized"})
    }
    const user = jwt.verify(token, process.env.API_SECRET as string) as User
    res.locals.user = user // to store data and we can access the data btw handlers
    next()//this is veeeeery important to jump to next function
    }catch(e){
        return res.status(403).json({"msg":"you are not authorized"})
    }
}