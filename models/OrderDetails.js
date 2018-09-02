module.exports= function(sequelize, DataTypes){

    return sequelize.define('orderdetails',{
    
        idOrderDetail : {
    
            type : DataTypes.STRING,
            primaryKey : true,
            allowNull : false
        },
    
        idOrder : {
    
            type : DataTypes.STRING,
            allowNull : false
        },

        idProduct : {
            type : DataTypes.STRING,
            allowNull : false
        },

        Quantity : {
            type : DataTypes.INTEGER,
            allowNull : false
        }
    })
    
    
    }