import express from 'express';
import cors from 'cors';
import { test, registerUser, loginUser, getProfile } from '../controllers/authController.js';

const router = express.Router();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionSuccessStatus: 200,
}
router.use(cors(corsOptions));

router.get('/', test)
router.get('/profile', getProfile)
router.post('/register', registerUser);
router.post('/login', loginUser)

export { router };