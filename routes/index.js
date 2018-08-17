const express = require('express');
const sequelize = require('sequelize');
const router = express.Router();
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const path = require('path');
const request = require('request');

var connection;

if(process.env.JAWSDB_URL){

    //Heroku
  connection = new sequelize(process.env.JAWSDB_URL, {
  
    dialect : 'mysql',
  
    define : {
  
       freezeTableName : true,
       timestamps : false
    }
  
  })
  
  }
  
  else{
  
  connection = new sequelize("decoaries", "root", "password", {
  
    dialect : 'mysql',
  
    define : {
  
       freezeTableName : true,
       timestamps : false
    }
  
  })
  
  }

  // Authentication middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and 
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://decoaries.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'https://decoaries.auth0.com/api/v2/',
  issuer: `https://decoaries.auth0.com/`,
  algorithms: ['RS256']
});


  var Client = connection.import('../models/Client');
  var Company = connection.import('../models/Company');
  var Product = connection.import('../models/Product');
  var Order = connection.import('../models/Order');
  var OrderDetails = connection.import('../models/OrderDetails');


router.post('/api/register-client',checkJwt, function(req, res){
  var idCompany;

    //If the company is not in DB, create it//
    if(!req.body.exists){
      //Create Company//
     Company.create({
      CompanyName : req.body.companyName,
      Website : req.body.companyWebsite
    }).then(company =>{
      //Store ID of created company//
      idCompany = company.dataValues.idCompany
      //Create Client//
      Client.create({
        Name : req.body.name,
        Email : req.body.email,
        Gender : req.body.gender,
        Status : 'Active',
        RegisterDate : req.body.registerDate,
        Phone1 : req.body.phone1,
        Phone2 : req.body.phone2,
        idCompany : idCompany
      }).then(client=>{
        res.json({success :true});
      }).catch(e=>{
        console.log(e);
      res.json({success : false})
      })
    })
  } 
  //If the company is already stored in DB, find and store it's ID//
  else{
    Company.find({
      where : {
        CompanyName : req.body.companyName
      }
    }).then(company =>{
      //Create client//
      Client.create({
        Name : req.body.name,
        Email : req.body.email,
        Gender : req.body.gender,
        Status : req.body.status,
        RegisterDate : req.body.registerDate,
        Phone1 : req.body.phone1,
        Phone2 : req.body.phone2,
        idCompany : company.dataValues.idCompany
      }).then(client=>{
        res.json({success :true});
      }).catch(e=>{
        console.log(e);
      res.json({success : false})
      })
    })
  }

    

    


    
  


});

router.get('/api/get-companies', function(req, res){

    Company.findAll().then(json=>{
      res.send(json);
    }).catch(e=>{
      console.log(e);
    res.json({success :false});
    })

});

router.get('/api/get-companies2', function(req, res){
  connection.query("select company.idCompany, company.CompanyName as 'Company', company.Website from company").then(json=>{
    res.send(json)
  }).catch(e=>{
    console.log(e)
    res.json({success : false, msg: "Something went wrong"});
  })
})

router.get('/api/get-clients', function(req,res){
  connection.query("select client.idClient, client.Name, client.Gender, client.Email, client.Status, client.RegisterDate as 'Register Date', client.Phone1, client.Phone2, company.CompanyName as 'Company', company.Website from client inner join company on client.idCompany = company.idCompany")
  .then(data=>{
    res.send(data)
  }).catch(e=>{
    console.log(e)
    res.json({success :false})
  })
});

router.post('/api/update-client', checkJwt,function(req, res){

  if(!req.body.exists){
    Company.create({
      CompanyName : req.body.companyName
    }).then(company=>{
      Client.update({
        Name : req.body.name,
        Email : req.body.email,
        Gender : req.body.gender,
        Phone1 : req.body.phone1,
        Phone2 : req.body.phone2,
        idCompany : company.dataValues.idCompany
  },{ where : {
    idClient : req.body.idClient
  }}).then(client=>{
    res.json({success :true, msg : "Client data updated"});
  }).catch(e=>{
    console.log(e)
    res.json({success : false, msg: "Something went wrong"});
  })

    })
  }

  else{
    Company.find({
      where : {
        CompanyName : req.body.companyName
      }
    }).then(company=>{
      Client.update({
        Name : req.body.name,
        Email : req.body.email,
        Gender : req.body.gender,
        Status : req.body.status,
        Phone1 : req.body.phone1,
        Phone2 : req.body.phone2,
        idCompany : company.dataValues.idCompany
      }, {
        where : {
          idClient : req.body.idClient
        }
      }).then(client=>{
        res.json({success :true, msg : "Client info updated"});
      }).catch(e=>{
        console.log(e)
        res.json({success : false, msg : "Something went wrong"})
      })
    })
  }


  
});

router.post('/api/update-company', checkJwt, function(req,res){
Company.update({
  CompanyName : req.body.name,
  Website : req.body.website
}, {
  where : {
    idCompany : req.body.idCompany
  }
}).then(company=>{
  res.json({success :true, msg : "Company info updated"})
}).catch(e=>{
  console.log(e)
  res.json({success : false, msg : "Something went wrong"})
})
});

router.get('/api/get-products', function(req, res){
  Product.findAll().then(json=>{
    res.send(json);
  }).catch(e=>{
    console.log(e)
    res.json({success : false, msg : "Something went wrong"})
  })
});

router.post('/api/add-order', checkJwt, function(req,res){
  let auxArray = [];
  auxArray = req.body.orderProducts;
  Order.create({
    idClient : req.body.idClient,
    OrderDate : req.body.orderDate,
    Price : req.body.price
  }).then(order=>{
    auxArray.forEach(value=>{
      OrderDetails.create({
        idOrder : order.dataValues.idOrder,
        idProduct : value.idProduct,
        Quantity : value.Quantity,
      })
    })
  }).then(finish=>{
    res.json({success :true, msg : "Order created"})
  }).catch(e=>{
    console.log(e)
    res.json({success : false, msg : "Something went wrong"})
  })
});

router.get('/api/get-orders', function(req, res){

  connection.query("select client.idClient, client.Name as 'Client', client.Email, client.idCompany , company.CompanyName as 'Company', orders.idOrder, orders.OrderDate as 'Date', orders.Price from client inner join company on client.idCompany = company.idCompany inner join orders on orders.idClient = client.idClient")
  .then(json=>{
    res.send(json)
  }).catch(e=>{
    console.log(e)
    res.json({success : false, msg : "Something went wrong"});
  })


})

router.post('/api/get-order-details', checkJwt, function(req,res){
  connection.query("select orderdetails.Quantity, product.ProductName as 'Product' from orders inner join orderdetails on orders.idOrder= orderdetails.idOrder inner join product on orderdetails.idProduct = product.idProduct where orders.idOrder = "+req.body.idOrder)
  .then(json=>{
    res.send(json)
  }).catch(e=>{
    console.log(e)
    res.json({success :false, msg : "Something went wrong"})
  })
});

router.post('/api/update-order', checkJwt, function(req,res){
  let auxArray = [];
  auxArray=req.body.orderProducts;
  Order.update({
    Price : req.body.price
  }, {
    where : {
      idOrder : req.body.idOrder
    }
  }).then(order=>{
    OrderDetails.destroy({
      where : {
        idOrder : req.body.idOrder
      }
    }).then(destroyed=>{
      auxArray.forEach(value=>{
        OrderDetails.create({
          idOrder : req.body.idOrder,
          idProduct : value.idProduct,
          Quantity : value.Quantity
        })
      })
    }).then(finish=>{
      res.json({success : true, msg : "Order info updated"})
    }).catch(e=>{
      console.log(e)
      res.json({success : false, msg : "Something went wrong"});
    })
  })
});

router.post('/api/add-product',checkJwt, function(req,res){
  Product.create({
    ProductName : req.body.name,
    Size : req.body.size,
    ClothType : req.body.cloth
  }).then(product=>{
    res.json({success :true, msg : "Product added to database"})
  }).catch(e=>{
    console.log(e)
    res.json({success :false, msg : "Something went wrong"});
  })
});

router.post('/api/update-product', checkJwt, function(req, res){
  Product.update({
    ProductName : req.body.name,
    Size : req.body.size,
    ClothType : req.body.cloth
  }, {
    where : {
      idProduct : req.body.idProduct
    }
  }).then(product=>{
    res.json({success :true, msg : "Product info updated"});
  }).catch(e=>{
    console.log(e)
    res.json({success :false, msg : "Something sent wrong"});
  })
});

router.post('/api/clients-company', checkJwt, function(req,res){
  Client.findAll({
    where : {
      idCompany : req.body.idCompany
    }
  }).then(clients=>{
    res.send(clients)
  }).catch(e=>{
    console.log(e)
    res.json({success : false, msg : "Something went wrong"});
  })
});

router.post('/api/login', function(req, res){
let userToken;
let user;
let options1 = {
  url : 'https://decoaries.auth0.com/oauth/token',
  method : 'POST',
  headers: {
    'Content-Type' : 'application/json',
    'Authorization' : 'Bearer '+req.body.clientToken
  },
  form : {
    grant_type : 'password',
    client_id : 'phpxbP6A0vfUur3isYoKi8E6dicA33IM',
    client_secret : 'A5_dh9O8vxfIeeRupZXl6GafwsDbjpuoT2XXKPi6brSR5p_YN6BAb4Chev7TZ6Rh',
     audience : 'https://decoaries.auth0.com/api/v2/',
     username : req.body.email,
     password : req.body.password,
     scope : 'openid'
  }
}
request(options1, function(err, resp, body){
  if(err){
    console.log(err)
    return res.json({error : true, msg : 'Something went wrong'});
  }
  else {
  
 let json = JSON.parse(body);
 if(json.error){
   return res.json({error : true, msg : json.error_description})
 }
  userToken = json.access_token;
  let options2={
  url : 'https://decoaries.auth0.com/userinfo',
  method : 'GET',
  headers: {
    'Authorization' : 'Bearer '+userToken
  }
  }

request(options2, function(err, resp, body){
  if(err){
    return res.json({error : true, msg : 'Something went wrong'});
  }
  else{
    let user = JSON.parse(body);
    return res.json({userToken : userToken, user : user});
  }

})
  
  
  }
 
})

});


router.post('/api/signup', function(req, res){
  let options = {
    url : 'https://decoaries.auth0.com/api/v2/users',
    method : 'POST',
    headers : {
      'Authorization' : 'Bearer '+req.body.clientToken
    },
    form : {
      connection : 'Username-Password-Authentication',
      email : req.body.email,
      password : req.body.password,
      name : req.body.name,
      verify_email : true
    }
  }

  request(options, function(err, resp, body){
    if(err){
      return res.json({error: true, msg : "Something went wrong"})
    }

    let json = JSON.parse(body);
    if(json.error){
      return res.json({error : true, msg : json.message})
    }

    else{
      res.send(json);
    }
    

  })

})


module.exports = router;