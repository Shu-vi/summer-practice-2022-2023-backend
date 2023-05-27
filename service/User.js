const db = require('../db')
const jwt = require('jsonwebtoken');

const generateJwt = (username, role) => {
    return jwt.sign(
        {username, role},
        process.env.SECRET_KEY,
        {expiresIn: '1h'}
    );
};

class UserService {
    async createUser(user) {
        try {
            const existingUser = await this.getUserByUsername(user.username);
            if (existingUser) {
                throw new Error('Имя пользователя уже используется');
            } else {
                user.role = 'USER';
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

    async login(username, password) {
        const user = await db.getUserByUsername(username);
        if (user === null) {
            throw new Error('Пользователь не найден');
        }
        if (user.password !== password) {
            throw new Error('Неверный логин или пароль');
        }
        return generateJwt(username, user.role)
    }
}

module.exports = new UserService()