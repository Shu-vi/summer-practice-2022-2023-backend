require('dotenv').config();
const cron = require('node-cron');
const express = require('express');
const cors = require('cors');
const router = require('./routes/index');
const app = express();
app.use(cors());
const WSServer = (require('express-ws'))(app);
const aWss = WSServer.getWss();
const PORT = process.env.PORT || 5000;
const db = require('./db');



app.use(express.json());
app.use('/api', router);

app.ws('/', (ws, req) => {
    ws.on('message', (msg) => {
        msg = JSON.parse(msg);
        switch (msg.method) {
            case "connection":
                connectionHandler(ws, msg);
                break;
            case "chat":
                broadcastConnection(ws, msg);
                break;
        }
    });
});

const connectionHandler = (ws, msg) => {
    ws.id = msg.id;
    broadcastConnection(ws, msg);
};

const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach(client => {
        if (client.id === msg.id) {
            client.send(JSON.stringify(msg));
        }
    });
};

const checkGamesAndDelete = async () => {
    const games = await db.getGames() || [];
    const currentTimestamp = Date.now();
    for (const game of games) {
        const diff = currentTimestamp - game.lastUpdateDate;
        if (new Date(diff).getMinutes() > 5) {
            await db.deleteGame(game.id);
        }
    }
}

const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`server has been started on port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
};

start();

cron.schedule('*/5 * * * *', checkGamesAndDelete);