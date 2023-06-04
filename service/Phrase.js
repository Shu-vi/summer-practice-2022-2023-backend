const db = require('../db');
const {v4: uuidv4} = require('uuid');
const gameService = require("./Game");

class PhraseService {
    async createPhrase(phrase) {
        try {
            phrase.id = uuidv4();
            phrase.timestamp = Date.now();
            const createdPhrase = await db.createPhrase(phrase);
            const game = await gameService.getGameById(phrase.gameId);
            await gameService.updateTimestamp(game);
            return createdPhrase;
        } catch (error) {
            throw error;
        }
    }

    async getPhrasesByGame(gameId) {
        try {
            const phrases = db.getPhrasesByGame(gameId);
            if (phrases === null) {
                throw new Error('В этой игре пока нет ни 1 сообщения');
            }
            return phrases;
        } catch (error) {
            throw error;
        }
    }

    async getPhraseById(id) {
        try {
            const phrase = await db.getPhraseById(id);
        } catch (e) {
            throw e;
        }
    }
}

module.exports = new PhraseService()