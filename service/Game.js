const db = require('../db')
const userService = require("./User");
const {v4: uuidv4} = require('uuid');

class GameService {
    async createGame(game) {
        game.id = uuidv4();
        game.lastUpdateDate = Date.now();
        if (game.maxPlayers > 10) {
            throw new Error('Игроков не может быть больше 10');
        }
        try {
            const user = await userService.getUserByUsername(game.owner);
            if (user == null) {
                throw new Error('Пользователя с таким именем не существует');
            }
            return await db.createGame(game);
        } catch (e) {
            throw e;
        }
    }

    async getGameById(id) {
        try {
            const game = await db.getGameById(id);
            if (game === null) {
                throw new Error('Игра с таким id не найдена. Возможно она была удалена');
            }
            return game;
        } catch (error) {
            throw error;
        }
    }

    async getGames() {
        try {
            const games = await db.getGames();
            if (games === null) {
                throw new Error('Не найдено ни 1 игры');
            }
            return games;
        } catch (error) {
            throw error;
        }
    }

    async updateGame(game) {
        game.lastUpdateDate = Date.now();
        try {
            const isExist = db.getGameById(game.id);
            if (isExist) {
                await db.updateGame(game);
            } else {
                throw new Error('Не найдено ни 1 игры');
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new GameService()