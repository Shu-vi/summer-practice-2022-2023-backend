const db = require('../db');
const userService = require("./User");
const {v4: uuidv4} = require('uuid');

class GameService {
    async createGame(game) {
        game.id = uuidv4();
        game.lastUpdateDate = Date.now();
        if (game.maxPlayers > 10) {
            throw new Error('Игроков не может быть больше 10');
        } else if (game.maxPlayers < 2) {
            throw new Error('Игроков не может быть меньше 2');
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
            return await db.getGameById(id);
        } catch (error) {
            throw error;
        }
    }

    async getGameByUsername(username) {
        try {
            return await db.getGameByUsername(username);
        } catch (e) {
            throw e;
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
            const isExist = await db.getGameById(game.id);
            if (isExist) {
                await db.updateGame(game);
            } else {
                throw new Error('Не найдено ни 1 игры');
            }
        } catch (error) {
            throw error;
        }
    }

    async updateTimestamp(game) {
        game.lastUpdateDate = Date.now();
        try {
            await db.updateGame(game);
        } catch (e) {
            throw e;
        }
    }

    async connectToGame(username, gameId) {
        try {
            const isExist = await db.getGameById(gameId);
            if (isExist) {
                const countConnections = await this.countConnections(gameId);
                if (isExist.maxPlayers > countConnections) {
                    await db.connectToGame(username, gameId);
                    await this.updateTimestamp(isExist);
                } else {
                    throw new Error('Игра переполнена.');
                }
            } else {
                throw new Error('Игра не найдена.');
            }
        } catch (error) {
            throw error;
        }
    }

    async disconnectFromGame(username, gameId) {
        try {
            const isExist = await db.getGameById(gameId);
            if (isExist) {
                await db.disconnectFromGame(username, gameId);
                await this.updateTimestamp(isExist);
            } else {
                throw new Error('Игра не найдена.');
            }

        } catch (error) {
            throw error;
        }
    }

    async countConnections(gameId) {
        try {
            return await db.countConnections(gameId);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new GameService()