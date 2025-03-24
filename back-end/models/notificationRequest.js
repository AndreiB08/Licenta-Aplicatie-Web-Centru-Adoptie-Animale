import { DataTypes } from "sequelize";
import { db } from "./config.js";

export const NotificationRequest = db.define("notificationRequests", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  animalId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "animals",
      key: "id",
    },
  },
}, {
  timestamps: true,
});
