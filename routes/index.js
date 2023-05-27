const Router = require('express');
const router = new Router();
const gameRouter = require('./game');
const phraseRouter = require('./phrase');
const userRouter = require('./user');

router.use('/user', userRouter);
router.use('/game', gameRouter);
router.use('/phrase', phraseRouter);

module.exports = router;