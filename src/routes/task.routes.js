import {Router} from 'express' ;
import { getTasks, getTask, createTask, updateTask, deleteTask } from '../controllers/tasks.controller.js';
import { createTaskSchema } from '../schemas/task.schema.js';
import { validateSchema } from '../middlewares/validator.middleware.js';

const router = Router();

router.get('/tasks', getTasks);
router.get('/tasks/:id',getTask);
router.post('/tasks',validateSchema(createTaskSchema), createTask);
router.delete('/tasks/:id', deleteTask);
router.put('/tasks/:id', updateTask);

export default router;