require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes/index');
const app = express();
const WSServer = (require('express-ws'))(app);
const aWss = WSServer.getWss();
const PORT = process.env.PORT || 5002;


app.use(cors());
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

const start = () => {
    try {
        app.listen(PORT, () => {
            console.log(`server has been started on port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
};

start();