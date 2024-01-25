// models/MessageModel.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/dbConfig';

class Message extends Model {
  public id!: string;
  public userId!: number;
  public text!: string;
}

Message.init(
  {
    id: {
      type: DataTypes.UUID,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'message',
  }
);

export default Message;
