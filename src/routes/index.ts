import express from 'express';
import { createBot, getMessagesList, getUsersInfo, sendMessage } from '../controller/index';

const router = express.Router();

router.post('/bot', createBot);
router.get('/user/:username', getUsersInfo);
router.get('/message', getMessagesList);
router.post('/message', sendMessage);

export default router;
