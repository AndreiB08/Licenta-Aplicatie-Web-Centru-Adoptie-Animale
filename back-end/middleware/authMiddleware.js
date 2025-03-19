// import jwt from "jsonwebtoken";

// const SECRET_KEY = "my_secret_key";

// const authenticate = (req, res, next) => {
//     const token = req.header("Authorization");

//     if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

//     try {
//         const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         res.status(401).json({ message: "Invalid token" });
//     }
// };

// const isAdmin = (req, res, next) => {
//     if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied. Admins only." });
//     next();
// };

// export {
//     authenticate,
//     isAdmin
// }