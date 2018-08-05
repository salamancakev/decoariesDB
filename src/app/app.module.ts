import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from "@angular/common";
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';

import { FormsModule } from '@angular/forms';

import {HttpModule} from '@angular/http';
import {FlashMessagesModule} from 'angular2-flash-messages';
import { ClientsDashboardComponent } from './components/clients-dashboard/clients-dashboard.component';
import { OrdersDashboardComponent } from './components/orders-dashboard/orders-dashboard.component';
import { ProductsDashboardComponent } from './components/products-dashboard/products-dashboard.component';
import { AddClientComponent } from './components/add-client/add-client.component';

import {DatabaseService} from './services/database.service';
import {ValidateService} from './services/validate.service';
import { ViewClientsComponent } from './components/view-clients/view-clients.component';
import { ViewCompaniesComponent } from './components/view-companies/view-companies.component';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ViewProductsComponent } from './components/view-products/view-products.component';

const appRoutes : Routes = [
  {path : '', redirectTo : 'home', pathMatch : 'full'},
  {path : 'home', component : HomeComponent},
  {path : 'clients', component : ClientsDashboardComponent},
  {path : 'orders', component : OrdersDashboardComponent},
  {path : 'products', component : ProductsDashboardComponent},
  {path : 'add-client', component : AddClientComponent},
  {path : 'view-clients', component : ViewClientsComponent},
  {path : 'view-companies', component : ViewCompaniesComponent},
  {path : 'add-order', component : AddOrderComponent},
  {path: 'view-orders', component : ViewOrdersComponent},
  {path : 'add-product', component : AddProductComponent},
  {path : 'view-products', component :ViewProductsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClientsDashboardComponent,
    OrdersDashboardComponent,
    ProductsDashboardComponent,
    AddClientComponent,
    ViewClientsComponent,
    ViewCompaniesComponent,
    AddOrderComponent,
    ViewOrdersComponent,
    AddProductComponent,
    ViewProductsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    FlashMessagesModule.forRoot(),
    FormsModule,
    HttpModule
  ],
  providers: [DatabaseService, ValidateService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
