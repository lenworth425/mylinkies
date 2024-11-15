import { Router } from 'express';
const router = Router();

import { getThoughts, getSingleThought, createThought, updateThought, deleteThought, addReaction, deleteReaction } from '../../controllers/thoughtController.js';

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:id
router
    .route('/:id')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtid/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtid/reactions/:reactionid').delete(deleteReaction);



export default router;
