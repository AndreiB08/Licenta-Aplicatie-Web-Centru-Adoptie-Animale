import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
console.log("SECRET_KEY in authMiddleware:", SECRET_KEY); // 🔥 Adaugă acest log pentru debug

const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log("Received authHeader:", authHeader); // 🔍 Debugging

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Acces denied. No token provided." });
        }

        const token = authHeader.split(" ")[1].trim();
        console.log("Extracted token:", token); // 🔍 Debugging

        const decoded = jwt.verify(token, SECRET_KEY);
        console.log("Decoded token:", decoded); // 🔍 Debugging


        req.employee = decoded;
        next();
    } catch (error) {
        console.error("Authentification error: ", error);
        res.status(403).json({ message: "Invalid or expired token." });
    }
};

export {
    authenticate,
}
