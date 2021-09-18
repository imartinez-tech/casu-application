const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Game extends Model {}

Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    //player choice is 1 = rock, player choice 2 = paper, player choice 3 = scissors
    player_choice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    computer_choice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    // 1 = player wins, 2 = player loses
    outcome: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'game',
  }
);

module.exports = Game;