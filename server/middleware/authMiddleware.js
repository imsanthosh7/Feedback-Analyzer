import jwt from 'jsonwebtoken';
import adminModel from '../models/adminModel.js';

export const verifyAdmin = async (req, res, next) => {

    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const admin = await adminModel.findById(decoded.id);

        if (!admin) {
            return res.status(401).json({ message: 'Unauthorized: Admin not found' })
        }
        req.admin = admin;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }


}