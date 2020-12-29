import { Router } from 'express';
import { getTodos, createTodo, deleteTodo, updateTodo } from '../controllers/todoController';

const router: Router = Router();

router.get('/', getTodos);

router.post('/', createTodo);

router.delete('/:id', deleteTodo);

router.put('/:id', updateTodo);

// TODO: add imports from root dir

export default router;