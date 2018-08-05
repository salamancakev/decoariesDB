module.exports= function(sequelize, DataTypes){

    return sequelize.define('client',{
    
        idClient : {
    
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
    
        Name : {
    
            type : DataTypes.STRING,
            allowNull : false
        },

        Gender : {
            type : DataTypes.CHAR(1),
            allowNull : false
        },

        Email : {
           type : DataTypes.STRING,
           unique : true, 
           allowNull : false
        },

        Status :  {
            type: DataTypes.STRING,
            allowNull : false
        },

        RegisterDate :{
            type: DataTypes.DATE,
            allowNull : false
        },

        Phone1 : {
            type : DataTypes.STRING,
            allowNull : false
        },
        Phone2 : {
            type : DataTypes.STRING,
            allowNull : true
        },

        idCompany : {
            type : DataTypes.INTEGER,
            allowNull : false
        }
    })
    
    
    }