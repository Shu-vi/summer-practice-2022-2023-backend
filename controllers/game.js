const gameService = require("../service/Game");

class GameController {
    async create(req, res) {
        const {maxPlayers, owner, title} = req.body;
        try {
            const game = await gameService.createGame({maxPlayers, owner, title});
            return res.status(200).json(game);
        } catch (e) {
            return res.status(500).json({message: e.message});
        }
    }

    async getAll(req, res) {
        try {
            const games = await gameService.getGames();
            return res.status(200).json(games);
        } catch (e) {
            return res.status(500).json({message: e.message});
        }
    }

    async getGameById(req, res) {
        const {id} = req.params;
        try {
            const game = await gameService.getGameById(id);
            return res.status(200).json(game);
        } catch (e) {
            return res.status(500).json({message: e.message});
        }

    }

    //TODO updateGame
}

module.exports = new GameController();