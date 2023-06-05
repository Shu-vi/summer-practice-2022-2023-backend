const Router = require('express');
const router = new Router();
const gameController = require('../controllers/game');
const authMiddleware = require('../middleware/auth');
// const checkRole = require('../middleware/checkRole');

router.post('/', authMiddleware, gameController.create);
router.get('/', gameController.getAll);
router.get('/:id', authMiddleware, gameController.getGameById);
router.post('/connect/:id', authMiddleware, gameController.connectToGame);
router.post('/disconnect/:id', authMiddleware, gameController.disconnectFromGame);
router.get('/count/:id', gameController.countConnections);
router.get('/by-username/:username', authMiddleware, gameController.getGameByUsername);
router.post('/search', gameController.searchGamesByUsernameOrTitle);


module.exports = router;