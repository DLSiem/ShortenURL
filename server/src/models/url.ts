import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

interface UrlAttributes {
  id: number;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
}

class Url extends Model<UrlAttributes> implements UrlAttributes {
  public id!: number;
  public originalUrl!: string;
  public shortUrl!: string;
  public clicks!: number;
}

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
  },
  {
    sequelize,
    tableName: "urls",
  }
);
