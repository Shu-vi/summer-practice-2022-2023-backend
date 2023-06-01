const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        const token = JSON.parse(req.headers.authorization.split(' ')[1]);
        console.log(token);
        if (!token.token) {
            console.log('tut');
            return res.status(401).json({message: "Не авторизован"});
        }
        req.user = jwt.verify(token.token, process.env.SECRET_KEY);
        next();
    } catch (e) {
        console.log('tut2');
        res.status(401).json({message: "Не авторизован"});
    }
};