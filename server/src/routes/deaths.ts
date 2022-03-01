import express from 'express';
const router = express.Router();
import { getDeaths } from '../controllers/deaths';
router.get('/',getDeaths);
export default router;