import {Register, findAllUser, findUser} from '../controller/user.controller'
import express from 'express'
let router = express.Router()

router.post('/', Register);
router.get('/', findAllUser);
router.get('/:id', findUser);


export default router;