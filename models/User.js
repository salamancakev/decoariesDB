module.exports= function(sequelize, DataTypes){

    return sequelize.define('user',{
    
        idUser : {
    
            type : DataTypes.STRING,
            primaryKey : true,
            allowNull : false
        },
    
        Name : {
    
            type : DataTypes.STRING,
            allowNull : false
        },

        Email : {
           type : DataTypes.STRING,
           unique : true, 
           allowNull : false
        },

        createDate :{
            type: DataTypes.DATE,
            allowNull : false
        },


        Type : {
            type : DataTypes.STRING,
            allowNull : false
        }

    })
    
    
    }