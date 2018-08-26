module.exports= function(sequelize, DataTypes){

    return sequelize.define('orders',{
    
        idOrder: {
    
            type : DataTypes.STRING,
            primaryKey : true,
            allowNull : false
        },
    
        OrderDate : {
    
            type : DataTypes.DATE,
            allowNull : false
        },

        idClient : {
            type : DataTypes.STRING,
            allowNull : false
        },
        Price : {
            type : DataTypes.FLOAT,
            allowNull : false
        }
    })
    
    
    }