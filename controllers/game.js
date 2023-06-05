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

    async getGameByUsername(req, res) {
        const {username} = req.params;
        try {
            const game = await gameService.getGameByUsername(username);
            return res.status(200).json(game);
        } catch (e) {
            return res.status(500).json({message: e.message});
        }
    }

    //TODO updateGame

    async connectToGame(req, res) {
        const {id} = req.params;
        const {username} = req.body;
        try {
            await gameService.connectToGame(username, id);
            return res.status(200).json({});
        } catch (e) {
            return res.status(500).json({message: e.message});
        }
    }

    async disconnectFromGame(req, res) {
        const {id} = req.params;
        const {username} = req.body;
        try {
            await gameService.disconnectFromGame(username, id);
            return res.status(200).json({});
        } catch (e) {
            return res.status(500).json({message: e.message});
        }
    }

    async countConnections(req, res) {
        const {id} = req.params;
        try {
            const count = await gameService.countConnections(id);
            return res.status(200).json(count);
        } catch (e) {
            return res.status(500).json({message: e.message});
        }
    }

    async searchGamesByUsernameOrTitle(req, res) {
        const {criterion} = req.body;
        try {
            const games = await gameService.searchGamesByUsernameOrTitle(criterion);
            return res.status(200).json(games);
        } catch (e) {
            return res.status(500).json({message: e.message});
        }
    }
}

module.exports = new GameController();