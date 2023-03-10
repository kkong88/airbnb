'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    toSafeObject(){
      const {id, ownerId, address, city, state, country, lat, lng, name, description, price, avgRating, previewImage } = this
      return { id, ownerId, address, city, state, country, lat, lng, name, description, price, avgRating, previewImage };
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {foreignKey:'ownerId', as: 'Owner'})
      Spot.hasMany(models.Review, {foreignKey: 'spotId', onDelete:'CASCADE'})
      Spot.hasMany(models.SpotImage, {foreignKey:'spotId', onDelete: 'CASCADE'})
      Spot.hasMany(models.Booking, {foreignKey: 'spotId', onDelete: 'CASCADE'})
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: 'User'
      // }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
     type: DataTypes.STRING,
     allowNull: false
    },
    state: {
     type: DataTypes.STRING,
     allowNull: false
    },
    country: {
     type: DataTypes.STRING,
     allowNull: false
    },
    lat: {
     type: DataTypes.DECIMAL,
     allowNull: false
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    name: {
     type: DataTypes.STRING,
     allowNull: false
    },
    description: {
     type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DECIMAL,
    },
    // avgRating: {
    //   type: DataTypes.DECIMAL
    // },
    // previewImage:{
    //   type: DataTypes.STRING
    // }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
