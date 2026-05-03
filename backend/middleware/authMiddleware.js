const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: "No token provided" });

    jwt.verify(token.split(" ")[1] || token, process.env.JWT_SECRET || 'secretKey', (err, decoded) => {
        if (err) return res.status(401).json({ message: "Unauthorized!" });
        req.user = decoded;
        next();
    });
};

const verifyAdmin = (req, res, next) => {
    if (req.user && req.user.userRole === 'Admin') {
        next();
    } else {
        res.status(403).json({ message: "Require Admin Role!" });
    }
};

module.exports = { verifyToken, verifyAdmin };
