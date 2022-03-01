import express from 'express';
const app = express();
import cors from 'cors';
app.use(express.json());
app.use(cors());
import postRoutes from './routes/posts'
import deathRoutes from './routes/deaths'
import dataRoutes from './routes/data'
import './db/db.js';
app.use('/posts', postRoutes)
app.use('/deaths', deathRoutes)
app.use('/data', dataRoutes)
app.listen(8000)