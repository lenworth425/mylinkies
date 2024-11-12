import { Router } from 'express';
const router = Router();
import { createUser, getUsers, getSingleUser, addFriend, deleteFriend } from '../../controllers/userController.js';

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userid
router.route('/:userid').get(getSingleUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

export default router;