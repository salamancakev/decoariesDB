module.exports = function(sequelize, DataTypes) {
  return sequelize.define("orders", {
    idOrder: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },

    OrderDate: {
      type: DataTypes.DATE,
      allowNull: false
    },

    idClient: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },

    Status: {
      type: DataTypes.STRING,
      allowNull: false
    },

    Observations: {
      type: DataTypes.STRING,
      allowNull: true
    },

    Reason : {
      type : DataTypes.STRING,
      allowNull : true
    },

    Deleted : {
      type : DataTypes.TINYINT,
      allowNull: false
    }
  });
};
