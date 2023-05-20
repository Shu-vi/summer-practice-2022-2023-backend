require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandling');
const PORT = process.env.PORT || 5002;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

// app.use(errorHandler)

const user = {
    firstName: 'Вадим',
    lastName: 'Генералов',
    username: 'Shuvi',
    password: '12345',
    city: 'Казань',
    district: 'Советский'
}

const game = {
    lastUpdateDate: null,
    maxPlayers: 5,
    id: null
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