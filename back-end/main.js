import express from "express";
import cors from "cors";
import { router as indexRouter } from "./routes/index.js";
import { synchronizeDatabase } from "./models/config.js";
import { runSeed } from "./models/seed.js";

const PORT = 8080;
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'] 
}));

app.use(express.json());
app.use("/", indexRouter);

const startServer = async () => {
    try {
        console.log("Starting server...");
        await synchronizeDatabase();
        console.log("Database synchronized successfully.");

        await runSeed();

        app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
    } catch (err) {
        console.error("There was an error with the database connection: ", err);
        process.exit(1);
    }
};

startServer();