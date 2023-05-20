const userService = require("../service/User");

class UserController {
    async create(req, res){
        const {firstName, lastName, username, password, city, district} = req.body;
        const user = await userService.createUser({
            firstName,
            lastName,
            username,
            password,
            city,
            district
        });
        return res.status(200).json(user);
    }

    async getByUsername(req, res){
        const {username} = req.params;
        const user = await userService.getUserByUsername(username);
        return res.status(200).json(user);
    }

    async update(req, res) {
        const {firstName, lastName, username, password, city, district} = req.body;
        const user = await userService.updateUser({
            firstName,
            lastName,
            username,
            password,
            city,
            district
        });
        return res.status(200).json(user);
    }

    //TODO изменение игры
}

module.exports = new UserController();