import express from 'express';

import profileController from '../controllers/profileController.js';
import postController from '../controllers/postController.js';
import { verifyAuthentication } from '../passport/passport.js'; // import verifyAuthentication from passport.js
import { uploadMultipleFiles } from '../middleware/fileUploader.js'
const router = express.Router();

router.post('/posts', verifyAuthentication,uploadMultipleFiles ,profileController.createPost);
router.post('/posts/like', verifyAuthentication, postController.likePost);
router.delete('/posts/unlike', verifyAuthentication, postController.unlikePost);

export default router;
