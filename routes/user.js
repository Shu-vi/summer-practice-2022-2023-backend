const Router = require('express');
const router = new Router();
const userController = require('../controllers/user');
const authMiddleware = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

router.post('/', userController.create);
router.put('/', authMiddleware, checkRole('ADMIN'), userController.update);
router.post('/active', authMiddleware, checkRole('ADMIN'), userController.getActiveUsers);
router.get('/:username', authMiddleware, userController.getByUsername);
router.post('/login', userController.login);
router.post('/by-game-id', authMiddleware, userController.getUsersByGameId);

module.exports = router;