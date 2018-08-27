module.exports= function(sequelize, DataTypes){

    return sequelize.define('phone',{
    
        idPhone : {
    
            type : DataTypes.STRING,
            primaryKey : true,
            allowNull : false
        },
    
        PhoneNumber : {
            type : DataTypes.STRING,
            unique : true,
            allowNull : false
        },

        idClient : {
            type : DataTypes.STRING,
            allowNull : false
        }
    })
    
    
    }