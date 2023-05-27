const Router = require('express');
const router = new Router();
const userController = require('../controllers/user');
const authMiddleware = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

router.post('/', userController.create);
router.put('/', authMiddleware, checkRole('ADMIN'), userController.update);
router.get('/:username', authMiddleware, userController.getByUsername);
router.post('/login', userController.login);

module.exports = router;