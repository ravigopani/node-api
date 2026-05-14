import express from 'express';
import { createPost, getAllPosts, getPostById, updatePost, deletePost } from '../controllers/postController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateCreatePost } from '../validators/postValidator.js';

const router = express.Router();

router.use(authMiddleware);
router.get('/getAllPosts', getAllPosts);
router.post('/createPost', validateCreatePost, createPost);
router.get('/getPostById/:id', getPostById);
router.put('/updatePost/:id', updatePost);
router.delete('/deletePost/:id', deletePost);
// router.post('/createPost', authMiddleware, createPost);

// router.get('/getAllUsers', (req, res) => {
//     // res.send('All Users');
//     res.json({ message: 'All Users' });
// });

// router.get('/getUserById/:id', (req, res) => {
//     const { id } = req.params;
//     res.json({ message: `User with id ${id}` });
// });
// router.post('/createPost', (req, res) => {
//     // const { name, email, password } = req.body;
//     // res.json({ message: `User created with name ${name}` });
//     res.json({ message: 'User created' });
// });
// router.put('/updateUser/:id', (req, res) => {
//     const { id } = req.params;
//     const { title, description, rating } = req.body;
//     res.json({ message: `User updated with id ${id}` });
// });
// router.delete('/deleteUser/:id', (req, res) => {
//     const { id } = req.params;
//     res.json({ message: `User deleted with id ${id}` });
// });

export default router;