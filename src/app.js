import express from "express";
import morgan from "morgan";
import authRoutes from './routes/auth.routes.js';
import tasks from './routes/task.routes.js';
import cookieParser from "cookie-parser";//middelware
import cors from 'cors';

const app = express();//server
 
app.use(cors({
    origin: 'https://alfa-project-frontend.onrender.com/#',
    credentials: true,
}));
app.use(morgan('dev'));

app.use(express.json());

app.use(cookieParser());

app.use('/api' ,authRoutes);

app.use('/api', tasks)


export default app;