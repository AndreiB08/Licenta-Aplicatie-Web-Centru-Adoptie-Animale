import { DataTypes } from "sequelize";
import { db } from "./config.js";

export const Animal = db.define("animals", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    species: {
        type: DataTypes.STRING,
        allowNull: false
    },
    breed: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    gender: {
        type: DataTypes.ENUM("male", "female"),
        allowNull: false
    },
    size: {
        type: DataTypes.ENUM("small", "medium", "large"),
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: true
    },
    health_status: {
        type: DataTypes.ENUM("healthy", "sick", "under treatment"),
        allowNull: false
    },
    vaccinated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    sterilized: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    adoption_status: {
        type: DataTypes.ENUM("available", "adopted", "reserved"),
        allowNull: false,
        defaultValue: "available"
    },
    arrival_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
    },
    last_updated: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    microchip_number: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true
    }
}, {
    timestamps: true,
    indexes: [
        { fields: ["species"] },
        { fields: ["adoption_status"] },
        { fields: ["arrival_date"] },
        { fields: ["microchip_number"], unique: true }
    ]
});
