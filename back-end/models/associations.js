import { Animal } from "./animals.js";
import { AdoptRequest } from "./adoptRequest.js";

AdoptRequest.belongsTo(Animal, { foreignKey: "animalId", onDelete: "CASCADE" });
Animal.hasMany(AdoptRequest, { foreignKey: "animalId" });
