const db = require('../db')

class UserService {

    async createUser(user) {
        if (!user) {
            throw new Error('Объект пользователя не определён');
        }
        const requiredProperties = ['firstName', 'lastName', 'username', 'password', 'city', 'district'];
        for (const prop of requiredProperties) {
            if (!user.hasOwnProperty(prop)) {
                throw new Error(`Пользователь не имеет свойства ${prop}`);
            }
        }
        try {
            const isExist = await this.getUserByUsername(user.username);
            if (isExist) {
                throw new Error('Имя пользователя уже используется');
            } else {
                return await db.createUser(user);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getUserByUsername(username){
        // Проверьте, что username не null или undefined
        if (!username) {
            throw new Error('Объект пользователя не определён');
        }
        const result = await db.getUserByUsername(username);
        if (result.records.length === 0) {
            return null
        } else {
            return result.records[0].get('u').properties
        }
    }

    async updateUser(user) {
        if (!user) {
            throw new Error('Объект пользователя не определён');
        }
        const requiredProperties = ['firstName', 'lastName', 'username', 'password', 'city', 'district'];
        for (const prop of requiredProperties) {
            if (!user.hasOwnProperty(prop)) {
                throw new Error(`Пользователь не имеет свойства ${prop}`);
            }
        }
        try {
            await db.updateUser(user);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = new UserService()