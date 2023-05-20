const Router = require('express');
const router = new Router();
const userController = require('../controllers/user');
// const authMiddleware = require('../middleware/auth');
// const checkRole = require('../middleware/checkRole');

router.post('/', userController.create);
router.put('/', userController.update);
router.get('/:username', userController.getByUsername);

module.exports = router;