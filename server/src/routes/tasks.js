const { Router } = require('express');
const taskCtrl = require('../controllers/tasks.controller');

const router = Router();

router.get('/', taskCtrl.getTasks);
router.post('/', taskCtrl.createTask);
router.put('/:id', taskCtrl.updateTask);
router.delete('/:id', taskCtrl.deleteTask);

module.exports = router;
