import { DataTypes } from "sequelize";
import sequelize from "./index.js";

const Vote = sequelize.define("Vote", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
  },
  option: {
    type: DataTypes.INTEGER,
  },
});

export default Vote;
