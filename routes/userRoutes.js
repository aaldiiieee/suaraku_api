import express from 'express';
import { getAllUsers, getUserById, createUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/get-all-users', getAllUsers);
router.get('/get-user/:id', getUserById);
router.post('/create-user', createUser);

export default router;
