import jwt from 'jsonwebtoken';

const adminAuthMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    
    if (!token) {
        return res.json({success: false, message: 'Not authorized, no token'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if(decoded.role !== 'admin') {
            return res.json({success: false, message: 'Not authorized as admin'});
        }
        
        req.body.adminId = decoded.id;
        next();
    } catch (error) {
        return res.json({success: false, message: 'Not authorized, token failed'});
    }
}

export default adminAuthMiddleware;