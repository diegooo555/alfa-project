import express from "express";
import morgan from "morgan";
import authRoutes from './routes/auth.routes.js';
import tasks from './routes/task.routes.js';
import cookieParser from "cookie-parser";//middelware
import cors from 'cors';
import { FRONTEND_URL } from "./config.js";

const app = express();//server
 
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}));

app.use(morgan('dev'));

app.use(express.json());

app.use(cookieParser());

app.use('/api' ,authRoutes);

app.use('/api', tasks)


export default app;