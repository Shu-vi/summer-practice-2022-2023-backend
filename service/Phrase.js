const db = require('../db')


class PhraseService {
    async createPhrase(phrase) {
        try {
            phrase.timestamp = Date.now();
            return await db.createPhrase(phrase);
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
}

module.exports = new PhraseService()