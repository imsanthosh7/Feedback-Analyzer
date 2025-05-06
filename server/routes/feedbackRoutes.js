import express from 'express';

import { analyzeFeedback, getAllFeedback } from '../controllers/feedbackController.js';
import { verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/analyze', analyzeFeedback)
router.get('/feedbacks', verifyAdmin, getAllFeedback)

export default router;