const db = require('../db')

class UserService {
    async createUser(user) {
        try {
            const existingUser = await this.getUserByUsername(user.username);
            if (existingUser) {
                throw new Error('Имя пользователя уже используется');
            } else {
                return await db.createUser(user);
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async getUserByUsername(username) {
        try {
            return await db.getUserByUsername(username);
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateUser(user) {
        try {
            await db.updateUser(user);
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = new UserService()