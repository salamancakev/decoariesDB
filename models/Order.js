module.exports= function(sequelize, DataTypes){

    return sequelize.define('orders',{
    
        idOrder: {
    
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
    
        OrderDate : {
    
            type : DataTypes.DATE,
            allowNull : false
        },

        idClient : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        Price : {
            type : DataTypes.FLOAT,
            allowNull : false
        }
    })
    
    
    }