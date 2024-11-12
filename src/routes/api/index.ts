import { Router } from 'express';
const router = Router();
import userRouter from './userRoutes.js';

router.use('/users', userRouter);

export default router;
