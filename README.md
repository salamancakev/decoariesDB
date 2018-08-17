# DecoariesApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Back-End Endpoints
 1)  1) URL: 'https://decoaries.herokuapp.com/api/get-clients 
    2) Method: GET
    
   
2)  1) URL: 'https://decoaries.herokuapp.com/api/register-client'
    2) Method: POST
    3) Headers: 'Content-Type : application/json'
    4) Body: name : String, email : String, gender : String, registerDate : Date, phone1 : String, phone2 : String, companyName : String, companyWebsite : String
    
3) 1) URL: 'https://decoaries.herokuapp.com/api/get-companies'
   2) Method: GET
 4) 1) URL: 'https://decoaries.herokuapp.com/api/update-client'
   2) Method: POST
   3) Headers: 'Content-Type : application/json'
   4) Body: idClient : Integer, name : String, email : String, gender : String, phone1 : String, phone2 : String, companyName : String, exists : Boolean
   5) exists: true si la compañía ya existe en la BD, de lo contrario false
   
5) 1) URL: 'https://decoaries.herokuapp.com/api/update-company'
   2) Method: POST
   3) Headers: 'Content-Type : application/json'
   4) Body: idCompany : Integer, name : String, website : String
   
6) 1) URL: 'https://decoaries.herokuapp.com/api/get-products'
   2) Method: GET
   
7) 1) URL: 'https://decoaries.herokuapp.com/api/add-order'
   2) Method: POST
   3) Headers: 'Content-Type : application/json'
   4) Body: idClient : Integer, orderDate : Date, price : Float, orderProducts : Object[]
   5) orderProducts: array de objetos con la siguiente estructura: {idProduct : Integer, Quantity : Integer}
   
8) 1) URL: 'https://decoaries.herokuapp.com/api/get-orders'
   2) Method: GET
 9) 1) URL: 'https://decoaries.herokuapp.com/api/get-order-details'
   2) Method: POST
   3) Headers: 'Content-Type : application/json'
   4) Body: idOrder : Integer
   
10) 1) URL: 'https://decoaries.herokuapp.com/api/update-order'
    2) Method: POST
    3) Headers: 'Content-Type : application/json'
    4) Body: idOrder : Integer, price : Float, orderProducts : Object[]
    5) orderProducts: mismo caso que el punto 7)
    
 11) 1) URL: 'https://decoaries.herokuapp.com/api/add-product'
     2) Method: POST
     3) Headers: 'Content-Type : application/json'
     4) Body: name : String, size : String, cloth : String
     
 12) 1) URL: 'https://decoaries.herokuapp.com/api/update-product'
     2) Method: POST
     3) Headers: 'Content-Type : application/json'
     4) Body: idProduct : Integer, name : String, size : String, cloth : String
     
 13) 1) URL: 'https://decoaries.herokuapp.com/api/clients-company'
     2) Method: POST
     3) Headers: 'Content-Type : application/json'
     4) Body: idCompany : Integer
     
 14) 1) URL: 'https://decoaries.herokuapp.com/api/login'
     2) Method : POST
     3) Headers: 'Content-Type : application/json'
     4) Body: email : String, password : String, clientToken : String
     
 16) 1) URL: 'https://decoaries.herokuapp.com/api/signup'
     2) Method : POST
     3) Headers: 'Content-Type : application/json'
     4) Body : name : String, email : String, password : String, clientToken : String
