import {createPost, deletePost, deleteUserPosts, findAllPosts, findUserPosts, updatePost} from '../controller/post.controller'
import express from 'express'
let router = express.Router()

router.post('/', createPost);
router.get('/', findAllPosts);
router.get('/:id', findUserPosts);
router.put('/:id', updatePost);
router.delete('/:id', deleteUserPosts);
router.delete('/:id', deletePost);

export default router;