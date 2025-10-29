const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', projectController.getProjects);
router.post('/', authenticateToken, projectController.addProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;