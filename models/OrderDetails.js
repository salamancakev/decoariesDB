module.exports= function(sequelize, DataTypes){

    return sequelize.define('orderdetails',{
    
        idOrderDetail : {
    
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
    
        idOrder : {
    
            type : DataTypes.INTEGER,
            allowNull : false
        },

        idProduct : {
            type : DataTypes.INTEGER,
            allowNull : false
        },

        Quantity : {
            type : DataTypes.INTEGER,
            allowNull : false
        }
    })
    
    
    }