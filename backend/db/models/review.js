'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    toSafeObject(){
      const {id, userId, spotId, review, star} = this
      return {id, userId, spotId, review, star}
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, {foreignKey: 'userId'})
      Review.belongsTo(models.Spot, {foreignKey: 'spotId', onDelete: 'CASCADE'})
      Review.hasMany(models.reviewImage, {foreignKey:'reviewId', onDelete:'CASCADE'})
    }
  }
  Review.init({
    userId: {
     type: DataTypes.INTEGER,
     allowNull: false
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE'
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false
    },
    star: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
