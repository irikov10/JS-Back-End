const jwt = require('../lib/jwt');
const SECRET = '7d9ef53a-0b9f-11ee-be56-0242ac120002';

exports.auth = async (req, res, next) => {
    const token = req.cookies['token'];

    if(token) {
        try {
            const decodedToken = await jwt.verify(token, SECRET);

            req.user = decodedToken;
            res.locals.user = decodedToken;
            res.locals.isAuthenticated = true;

            next();
        } catch (error) {
            res.clearCookie('token');

            res.redirect('/users/login')
        }
    } else {
        next()
    }
}

exports.isAuth = (req, res, next) => {
    if(!req.user) {
        return res.redirect('/users/login');
    }

    next();
}