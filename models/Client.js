module.exports= function(sequelize, DataTypes){

    return sequelize.define('client',{
    
        idClient : {
    
            type : DataTypes.STRING,
            primaryKey : true,
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

        createDate :{
            type: DataTypes.DATE,
            allowNull : false
        },


        idCompany : {
            type : DataTypes.STRING,
            allowNull : false
        },
        
        idUser : {
            type :  DataTypes.STRING,
            allowNull : false
        }
    })
    
    
    }