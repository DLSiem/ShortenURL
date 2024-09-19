import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface UrlAttributes {
  id?: number;
  originalUrl: string;
  shortUrl: string;
  clicks?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UrlCreationAttributes extends Optional<UrlAttributes, "id"> {}
class Url extends Model<UrlAttributes, UrlCreationAttributes> {}

Url.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    originalUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clicks: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "urls",
  }
);

export default Url;
