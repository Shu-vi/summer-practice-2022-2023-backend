const Router = require('express');
const router = new Router();
const phraseController = require('../controllers/phrase');
const authMiddleware = require('../middleware/auth');
// const checkRole = require('../middleware/checkRole');

router.post('/', authMiddleware, phraseController.create);
router.get('/:gameId', authMiddleware, phraseController.getPhrasesByGame);

module.exports = router;