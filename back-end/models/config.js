import { Sequelize } from "sequelize";

export const db = new Sequelize ({
    dialect: "sqlite",
    storage: "storage.db"
});

export const synchronizeDatabase = async () => {
    // console.log("Connecting to SQLite database...");
    try {
        await db.authenticate();
        // console.log("Connection to database has been established successfully.");

        await db.sync({ force: false });
        // console.log("Database synchronized successfully.");
    } catch (error) {
        console.error("Error connecting or synchronizing the database:", error);
    }
};