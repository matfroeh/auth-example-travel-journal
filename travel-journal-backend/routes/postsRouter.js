import { Router } from 'express';
import validateJOI from '../middlewares/validateJOI.js';
import {
  createPost,
  deletePost,
  getAllPosts,
  getSinglePost,
  updatePost
} from '../controllers/posts.js';
import { postSchema } from '../joi/schemas.js';
import verifyTokenMiddleware from '../middlewares/verifyTokenMiddleware.js';

const postsRouter = Router();

postsRouter.route('/').get(getAllPosts).post(validateJOI(postSchema), verifyTokenMiddleware, createPost);

postsRouter
  .route('/:id')
  .get(getSinglePost)
  .put(validateJOI(postSchema), verifyTokenMiddleware, updatePost)
  .delete(verifyTokenMiddleware, deletePost);

export default postsRouter;
