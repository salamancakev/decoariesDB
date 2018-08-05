module.exports= function(sequelize, DataTypes){

    return sequelize.define('company',{
    
        idCompany : {
    
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
    
        CompanyName : {
    
            type : DataTypes.STRING,
            unique : true,
            allowNull : false
        },

        Website : {
            type : DataTypes.STRING
        }
    })
    
    
    }