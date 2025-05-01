import express from 'express';
const router = express.Router();
import { test } from '../controllers/testController.js';

router.get('/verify',test);

export default router;