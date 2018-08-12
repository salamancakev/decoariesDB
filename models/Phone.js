module.exports= function(sequelize, DataTypes){

    return sequelize.define('phone',{
    
        idPhone : {
    
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
    
        PhoneNumber : {
    
            type : DataTypes.STRING,
            unique : true,
            allowNull : false
        },

        idClient : {
            type : DataTypes.INTEGER,
            allowNull : false
        }
    })
    
    
    }