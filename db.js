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
                'CREATE (u:User {firstName: $firstName, lastName: $lastName, username: $username, password: $password, city: $city, district: $district, role: $role}) RETURN u',
                user
            );
            return result.records[0].get('u').properties;
        } catch (error) {
            throw new Error('Не удалось создать пользователя');
        } finally {
            await session.close();
        }
    }

    async getUserByUsername(username) {
        const session = this.driver.session();
        try {
            const result = await session.run('MATCH (u:User {username: $username}) RETURN u', {
                username: username
            });
            return result.records.length > 0 ? result.records[0].get('u').properties : null;
        } catch (error) {
            throw new Error('Не удалось получить пользователя');
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
        } catch (error) {
            throw new Error('Не удалось обновить пользователя');
        } finally {
            await session.close();
        }
    }

    async createGame(game) {
        const session = this.driver.session();
        try {
            const result = await session.run(
                'CREATE (g:Game {lastUpdateDate: $lastUpdateDate, maxPlayers: $maxPlayers, id: $id, owner: $owner, title: $title}) RETURN g',
                game
            );
            return result.records[0].get('g').properties;
        } catch (e) {
            throw new Error('Не удалось создать игру');
        } finally {
            await session.close();
        }
    }

    async getGameById(id) {
        const session = this.driver.session();
        try {
            const result = await session.run('MATCH (g:Game {id: $id}) RETURN g', {id});
            return result.records.length > 0 ? result.records[0].get('g').properties : null;
        } catch (e) {
            throw new Error('Не удалось получить игру по id');
        } finally {
            await session.close();
        }
    }

    async getGameByUsername(username) {
        const session = this.driver.session();
        try {
            const result = await session.run('match (u:User {username: $username})-[c:CONNECTED_TO]->(g:Game) return g', {username});
            return result.records.length > 0 ? result.records[0].get('g').properties : null;
        } catch (e) {
            throw new Error('Не удалось получить игру по username')
        } finally {
            await session.close();
        }
    }

    async getGames() {
        const session = this.driver.session();
        try {
            const result = await session.run('MATCH (g:Game) RETURN g');
            return result.records.length > 0 ? result.records.map(game => game.get('g').properties) : null;
        } catch (e) {
            throw new Error('Не удалось получить игры');
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
        } catch (e) {
            throw new Error('Не удалось обновить игру');
        } finally {
            await session.close();
        }
    }

    async connectToGame(username, gameId) {
        const session = this.driver.session();
        try {
            await session.run(
                'MATCH (u:User {username: $username}), (g:Game {id: $gameId}) ' +
                'MERGE (u)-[:CONNECTED_TO]->(g)',
                { username, gameId }
            );
        } catch (error) {
            throw new Error('Не удалось подключить пользователя к игре');
        } finally {
            await session.close();
        }
    }

    async disconnectFromGame(username, gameId) {
        const session = this.driver.session();
        try {
            await session.run(
                'MATCH (u:User {username: $username})-[c:CONNECTED_TO]->(g:Game {id: $gameId}) ' +
                'DELETE c',
                { username, gameId }
            );
        } catch (error) {
            throw new Error('Не удалось отключить пользователя от игры');
        } finally {
            await session.close();
        }
    }

    async countConnections(gameId) {
        const session = this.driver.session();
        try {
            const result = await session.run(
                'MATCH (g:Game {id: $gameId})<-[c:CONNECTED_TO]-() ' +
                'RETURN count(c) as connections',
                { gameId }
            );
            const record = result.records[0];
            return record.get('connections').toNumber();
        } catch (error) {
            throw new Error('Не удалось посчитать количество подключений к игре');
        } finally {
            await session.close();
        }
    }

    async createPhrase(phrase) {
        const session = this.driver.session();
        try {
            const result = await session.run(
                'MATCH (u:User {username: $username}), (g:Game {id: $gameId}) ' +
                'CREATE (u)-[:SAY]->(p:Phrase {text: $text, timestamp: $timestamp})-[:TO]->(g)' +
                'RETURN p',
                phrase
            );
            return result.records[0].get('p').properties;
        } catch (e) {
            throw new Error('Не удалось создать фразу');
        } finally {
            await session.close();
        }
    }

    async getPhrasesByGame(gameId) {
        const session = this.driver.session();
        try {
            const result = await session.run(
                'MATCH (u:User)-[:SAY]->(p:Phrase)-[:TO]->(g:Game {id: $gameId}) ' +
                'RETURN p, u ORDER BY p.timestamp',
                { gameId }
            );
            return result.records.length > 0 ? result.records.map(phrase => ({phrase: phrase.get('p').properties, user: phrase.get('u').properties})) : null;
        } catch (e) {
            throw new Error('Не удалось получить фразу по игре');
        } finally {
            await session.close();
        }
    }
}

module.exports = new Database(process.env.DB_URI, process.env.DB_USERNAME, process.env.DB_PASSWORD);