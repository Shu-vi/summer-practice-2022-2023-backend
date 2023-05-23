const phraseService = require("../service/Phrase");

class PhraseController {
    async create(req, res) {
        const {gameId, username, text} = req.body;
        try {
            const phrase = await phraseService.createPhrase({gameId, username, text});
            return res.status(200).json(phrase);
        } catch (e) {
            return res.status(500).json({message: e.message});
        }
    }

    async getPhrasesByGame(req, res) {
        const {gameId} = req.params;
        try {
            const phrases = await phraseService.getPhrasesByGame(gameId);
            return res.status(200).json(phrases);
        } catch (e) {
            return res.status(500).json({message: e.message});
        }
    }

    //TODO updateGame
}

module.exports = new PhraseController();