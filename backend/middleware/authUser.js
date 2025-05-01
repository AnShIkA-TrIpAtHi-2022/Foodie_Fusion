import jwt from 'jsonwebtoken';

const userAuthMiddleware = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== 'user') {
            return res.json({ success: false, message: 'Not authorized as user' });
        }

        req.body.userId = decoded.id;
        next();
    } catch (error) {
        return res.json({ success: false, message: 'Not authorized, token failed' });
    }
};

export default userAuthMiddleware;