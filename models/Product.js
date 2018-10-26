module.exports = function(sequelize, DataTypes) {
  return sequelize.define("product", {
    idProduct: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },

    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    Description: {
      type: DataTypes.STRING,
      allowNull: true
    },

    Size : {
      type : DataTypes.STRING,
      allowNull : false
    },

    URL: {
      type: DataTypes.STRING,
      allowNull: true
    },

    imageID: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
};
