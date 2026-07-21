const jwt = require("jsonwebtoken");
const pool = require("../db");

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({
            message:"No token provided"
        });
    }
    const token = authHeader.split(" ")[1];
    try{
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        const result = await pool.query(
            `
            SELECT *
            FROM users
            WHERE id = $1
            `,
            [decoded.id]
        );
        if (result.rows.length === 0) {
            return res.status(401).json({
                message: "User not found"
            });
        }
        req.user = result.rows[0];
        next();
    }catch(error){
        return res.status(401).json({
            message:"Invalid token"
        });
    }
};

module.exports = authMiddleware;