const Router = require('express');
const router = new Router();
const gameController = require('../controllers/game');
// const authMiddleware = require('../middleware/auth');
// const checkRole = require('../middleware/checkRole');

router.post('/', gameController.create);
router.get('/', gameController.getAll);
router.get('/:id', gameController.getGameById);

module.exports = router;