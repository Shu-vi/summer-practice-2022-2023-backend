const neo4j = require('neo4j-driver');

class Database {
    constructor(uri, username, password) {
        this.driver = neo4j.driver(uri, neo4j.auth.basic(username, password));
    }

    async close() {
        await this.driver.close();
    }

    async createUser(user) {
        const session = this.driver.session();

        try {
            const result = await session.run(
                'CREATE (u:User {firstName: $firstName, lastName: $lastName, username: $username, password: $password, city: $city, district: $district}) RETURN u',
                user
            );

            return result.records[0].get('u').properties;
        } finally {
            await session.close();
        }
    }

    async getUserByUsername(username) {
        const session = this.driver.session();
        try {
            return await session.run('MATCH (u:User {username: $username}) RETURN u', {username});
        } finally {
            await session.close();
        }
    }

    async updateUser(user) {
        const session = this.driver.session();
        try {
            await session.run(
                'MATCH (u:User {username: $username}) SET u = $updatedUser',
                { username: user.username, updatedUser: user }
            );
        } finally {
            await session.close();
        }
    }

    async createGame(game) {
        const session = this.driver.session();
        try {
            const result = await session.run(
                'CREATE (g:Game {lastUpdateDate: $lastUpdateDate, maxPlayers: $maxPlayers, id: $id}) RETURN g',
                game
            );
            return result.records[0].get('g').properties;
        } finally {
            await session.close();
        }
    }

    async getGameById(id) {
        const session = this.driver.session();
        try {
            return await session.run('MATCH (g:Game {id: $id}) RETURN g', {id});
        } finally {
            await session.close();
        }
    }

    async getGames() {
        const session = this.driver.session();
        try {
            return await session.run('MATCH (g:Game) RETURN ID (g) AS id, g');
        } finally {
            await session.close();
        }
    }

    async updateGame(game) {
        const session = this.driver.session();
        try {
            await session.run(
                'MATCH (g:Game {id: $id}) SET g = $updatedGame',
                { id: game.id, updatedGame: game }
            );
        } finally {
            await session.close();
        }
    }

    async createPhrase(phrase) {
        const session = this.driver.session();

        try {
            const result = await session.run(
                'CREATE (p:Phrase {message: $message, date: $date}) RETURN p',
                phrase
            );
            return result.records[0].get('p').properties;
        } finally {
            await session.close();
        }
    }

    async getPhrasesByUserAndGame(userId, gameId) {
        const session = this.driver.session();

        try {
            return await session.run(
                'MATCH (p:Phrase)<-[:SENT]-(u:User {username: $userId})-[:PARTICIPATED_IN]->(g:Game {id: $gameId}) RETURN p',
                {userId, gameId}
            );
        } finally {
            await session.close();
        }
    }
}

module.exports = new Database(process.env.DB_URI, process.env.DB_USERNAME, process.env.DB_PASSWORD);