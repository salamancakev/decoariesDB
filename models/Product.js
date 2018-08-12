module.exports= function(sequelize, DataTypes){

    return sequelize.define('product',{
    
        idProduct : {
    
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
    
        ProductName : {
    
            type : DataTypes.STRING,
            unique : true,
            allowNull : false
        },

        Size : {
            type : DataTypes.STRING,
            allowNull : false
        },

        ClothType: {
            type : DataTypes.STRING,
            allowNull : false
        }
    })
    
    
    }