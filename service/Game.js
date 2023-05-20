const db = require('../db')

class GameService {

    async createGame(game) {
        const { v4: uuidv4 } = require('uuid');
        game.id = uuidv4();
        game.lastUpdateDate = Date.now();
        try {
            return await db.createGame(game);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getGameById(id) {
        try {
            const result = await db.getGameById(id);
            if (result.records.length === 0) {
                return null;
            } else {
                return result.records[0].get('g').properties;
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getGames() {
        try {
            const result = await db.getGames();
            if (result.records.length === 0) {
                return null;
            } else {
                return result.records.map(record => record.get('g').properties);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateGame(game) {
        game.lastUpdateDate = Date.now();
        try {
            await db.updateGame(game)
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = new GameService()