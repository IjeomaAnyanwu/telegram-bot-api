import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/dbConfig'

class Bot extends Model {
  public id!: string;
  public token!: string;
}

Bot.init(
  {
    id: {
      type: DataTypes.UUID,
      autoIncrement: true,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
  },
  {
    sequelize,
    modelName: 'bot',
  }
);

export default Bot;
