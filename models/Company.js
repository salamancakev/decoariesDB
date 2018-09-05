module.exports= function(sequelize, DataTypes){

    return sequelize.define('company',{
    
        idCompany : {
    
            type : DataTypes.STRING,
            primaryKey : true,
            allowNull : false
        },
    
        Name : {
    
            type : DataTypes.STRING,
            unique : true,
            allowNull : false
        },

        Website : {
            type : DataTypes.STRING,
            allowNull : true
        },

        From : {
            type : DataTypes.STRING,
            allowNull : false
        },

        idUser : {
            type : DataTypes.STRING,
            allowNull : false
        }
    })
    
    
    }