var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Prathamisagoodb$oy';

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
}

module.exports=fetchuser;