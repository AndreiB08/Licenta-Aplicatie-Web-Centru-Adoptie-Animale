import { Animal } from "./animals.js";
import { AdoptRequest } from "./adoptRequest.js";
import { NotificationRequest } from "./notificationRequest.js";

AdoptRequest.belongsTo(Animal, { foreignKey: "animalId", onDelete: "CASCADE" });
Animal.hasMany(AdoptRequest, { foreignKey: "animalId" });

NotificationRequest.belongsTo(Animal, { foreignKey: "animalId", onDelete: "CASCADE" });
Animal.hasMany(NotificationRequest, { foreignKey: "animalId" });