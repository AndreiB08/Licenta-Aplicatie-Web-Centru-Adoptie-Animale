// import { DataTypes } from "sequelize";
// import { db } from "./config.js";
// import bcrypt from "bcrypt";

// export const Employee = db.define("employee", {
//     id: {
//         type: DataTypes.UUID,
//         primaryKey: true,
//         defaultValue: DataTypes.UUIDV4
//     },
//     first_name: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     last_name: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     role: {
//         type: DataTypes.ENUM("admin", "staff"),
//         allowNull: false
//     }
// }, { timestamps: true });

// Employee.beforeCreate(async (employee) => {
//     const salt = await bcrypt.genSalt(10);
//     employee.password = await bcrypt.hash(employee.password, salt);
// });
