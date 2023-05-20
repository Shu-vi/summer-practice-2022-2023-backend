const gameService = require("../service/Game");

class GameController {
    async create(req, res){
        const {maxPlayers} = req.body;
        const game = await gameService.createGame({maxPlayers});
        return res.status(200).json(game);
    }

    async getAll(req, res){
        const games = await gameService.getGames();
        return res.status(200).json(games);
    }

    async getGameById(req, res) {
        const {id} = req.params;
        const game = await gameService.getGameById(id)
        return res.status(200).json(game);
    }

    //TODO изменение игры
}

module.exports = new GameController();