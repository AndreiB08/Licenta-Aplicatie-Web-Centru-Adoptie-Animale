import { Sequelize } from "sequelize";

export const db = new Sequelize({
    dialect: "sqlite",
    storage: "storage.db"
});

export const synchronizeDatabase = async () => {
    try {
        await db.authenticate();
        console.log("Database connection established successfully.");

        await db.sync({ force: false });
        console.log("Database synchronized.");
    } catch (error) {
        console.error("Database synchronization failed:", error);
    }
};
