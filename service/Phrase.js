

module.exports = class UserService {
    constructor(db) {
        this.db = db;
    }

    async createPhrase(phrase) {
        try {
            return await this.db.createPhrase(phrase);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getPhrasesByUserAndGame(userId, gameId) {
        try {
            const result = await this.db.getPhrasesByUserAndGame(userId, gameId);
            if (result.records.length === 0) {
                return null;
            }
            return result.records.map(record => record.get('p').properties);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}