import {Register, findAllUser, findUser, login} from '../controller/user.controller'
import express from 'express'
let router = express.Router()

router.post('/', Register);
router.post('/login', login);
router.get('/', findAllUser);
router.get('/:id', findUser);


export default router;