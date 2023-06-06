const userService = require("../service/User");

class UserController {
    async create(req, res) {
        const { firstName, lastName, username, password, city, district } = req.body;
        try {
            const user = await userService.createUser({
                firstName,
                lastName,
                username,
                password,
                city,
                district
            });
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getByUsername(req, res) {
        const { username } = req.params;
        try {
            const user = await userService.getUserByUsername(username);
            if (user == null) {
                return res.status(404).json({ message: 'Пользователь с таким именем не найден' });
            }
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async update(req, res) {
        const { firstName, lastName, username, password, city, district, role } = req.body;

        try {
            await userService.updateUser({
                firstName,
                lastName,
                username,
                password,
                city,
                district,
                role
            });
            return res.status(200).json({res: 'access'});
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async login(req, res) {
        const {username, password} = req.body;

        try {
            const token = await userService.login(username, password);
            return res.status(200).json({token})
        } catch (e) {
            return res.status(500).json({message: e.message});
        }

    }

    async getUsersByGameId(req, res) {
        const {gameId} = req.body;
        try {
            const users = await userService.getUsersByGameId(gameId);
            return res.status(200).json(users);
        } catch (e) {
            return res.status(500).json({message: e.message});
        }
    }

    async getActiveUsers(req, res) {
        try {
            const users = await userService.getActiveUsers();
            return res.status(200).json(users);
        } catch (e) {
            return res.status(500).json({message: e.message});
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            return res.status(200).json(users);
        } catch (e) {
            return res.status(500).json({message: e.message});
        }
    }
}

module.exports = new UserController();