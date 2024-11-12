import { Router } from 'express';
const router = Router();
import userRouter from './userRoutes.js';
import thoughtRouter from './thoughtRoutes.js';

router.use('/users', userRouter);
router.use('/thoughts', thoughtRouter);


export default router;
