import jwt from 'jsonwebtoken';
import config from '../helpers/config';

function verify (req, res, next ){
    const token = req.headers['x-access-token'];
    if(!token){
        return res.status(401).json({
            auth: false,
            msg: 'No token provided',
            headers: req.headers
        })
    }else{
        const decoded = jwt.verify(token, config.secret);
        req.userId = decoded.id;
        next();
    }
}
module.exports = verify;