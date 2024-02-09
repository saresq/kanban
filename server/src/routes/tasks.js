import { Router } from 'express';
import taskCtrl from '../controllers/tasks.controller.ts';

const router = Router();

router.get('/', taskCtrl.getTasks);
router.post('/', taskCtrl.createTask);
router.put('/:id', taskCtrl.updateTask);
router.delete('/:id', taskCtrl.deleteTask);

export default router;
