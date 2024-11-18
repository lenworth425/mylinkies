import { Router } from 'express';
const router = Router();
import { createUser, getUsers, getSingleUser, updateUser, deleteUser, addFriend, deleteFriend } from '../../controllers/userController.js';

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userid
router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/:userid/friends/:friendid
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

export default router;