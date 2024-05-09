import express from 'express';
import { google, signin, SignOut, signup } from '../controllers/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google); 
router.get('/signout', SignOut)

export default router;
