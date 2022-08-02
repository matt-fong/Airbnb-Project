'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(
        models.User,
          { foreignKey: 'ownerId', onDelete: 'CASCADE'}
      );
      Spot.hasMany(
        models.Booking,
        { foreignKey: 'spotId', onDelete: 'CASCADE' }
      );
      Spot.hasMany(
        models.Image,
        { foreignKey: 'spotId', onDelete: 'CASCADE' }
      );
      Spot.hasMany(
        models.Review,
        { foreignKey: 'spotId', onDelete: 'CASCADE' }
      );
    }
  }
  Spot.init({
    ownerId: DataTypes.INTEGER,
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'Address is required and cannot be empty.'
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'City is required and cannot be empty.'
        }
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'State is required and cannot be empty.'
        }
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'Country is required and cannot be empty.'
        }
      }
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'Lat is required and cannot be empty.'
        }
      }
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'Lng is required and cannot be empty.'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'Name is required and cannot be empty.'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'Description is required and cannot be empty.'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'Price is required and cannot be empty.'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};