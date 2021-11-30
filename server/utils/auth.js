const jwt = require('jsonwebtoken');

//store the secret in a .env later
const secret = 'I went with Ted Cruz to Cancun during the Texas snowpocalypse' //process.env.SUPER_SECRET;
const expiration = '2h'//process.env.EXP;

module.exports = {
    signToken: function({ username, email, _id }) {
        const payload = { username, email, _id };

        return jwt.sign({ data: payload }, secret, {expiresIn: expiration });
    },
    authMiddleware: function({ req }) {
        //allows token to be sent via req.body, req.query, or headers
        let token = req.body.token || req.query.token || req.headers.authorization;

        console.log(token);
        //separate "Bearer" from 'tokenvalue"
        if(req.headers.authorization) {
            token = token
                .slice(7)
                .trim()
            // token = token.split(' ').pop().trim();
                console.log(token);
        }

        //if no token, return request object as is
        if(!token) {
            return req;
        }

        try{
            //decode and attach user data to request object
            //secret here must match the jwt.sign() secret
            const { data } = jwt.verify(token, secret, { maxAge: expiration});
            req.user = data;
        } catch {
            console.log('Invald Token');
        }

        //return updated request object
        return req;
    }
};
