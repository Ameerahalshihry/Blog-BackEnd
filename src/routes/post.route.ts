import {createPost, deletePost, deleteUserPosts, findAllPosts, findUserPosts, updatePost} from '../controller/post.controller'
import express from 'express'
import { auth } from '../middleware/auth';
let router = express.Router()

router.post('/',auth, createPost);
router.get('/', findAllPosts);
router.get('/:id', findUserPosts);
router.put('/', auth, updatePost);
router.delete('/deleteUserPosts',auth, deleteUserPosts);
router.delete('/deletePost/:id', auth, deletePost);

export default router;