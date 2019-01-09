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
import { AuthService } from "./services/auth.service";
import { ViewClientsComponent } from './components/view-clients/view-clients.component';
import { ViewCompaniesComponent } from './components/view-companies/view-companies.component';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ViewProductsComponent } from './components/view-products/view-products.component';
import { SearchClientNamePipe } from "./pipes/search-client-name.pipe";
import {SearchOrderClientPipe} from './pipes/search-order-client.pipe';
import {SearchProductPipe} from './pipes/search-product.pipe';
import {SearchUserPipe} from './pipes/search-user.pipe';
import {SearchCompanyPipe} from './pipes/search-company.pipe';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UsersDashboardComponent } from './components/users-dashboard/users-dashboard.component';
import { ViewUsersComponent } from './components/view-users/view-users.component';
import { DeletedOrdersComponent } from './components/deleted-orders/deleted-orders.component';
import { AnalisisDashboardComponent } from './components/analisis-dashboard/analisis-dashboard.component';
import { AnalysisProductComponent } from './components/analysis-product/analysis-product.component';
import { AnalysisCompanyComponent } from './components/analysis-company/analysis-company.component';
import { AnalysisEmployeeComponent } from './components/analysis-employee/analysis-employee.component';
import { ExcelService } from './services/excel.service';
import { SearchOrderIdPipe } from './pipes/search-order-id.pipe';
import { SearchOrderEmailPipe } from './pipes/search-order-email.pipe';
import { SearchOrderStatusPipe } from './pipes/search-order-status.pipe';
import { SearchOrderCompanyPipe } from './pipes/search-order-company.pipe';
import { SearchOrderDatePipe } from './pipes/search-order-date.pipe';
import { SearchOrderPricePipe } from './pipes/search-order-price.pipe';
import { SearchClientGenderPipe } from './pipes/search-client-gender.pipe';
import { SearchClientEmailPipe } from './pipes/search-client-email.pipe';
import { SearchClientCompanyPipe } from './pipes/search-client-company.pipe';
import { SearchClientStatusPipe } from './pipes/search-client-status.pipe';
import { SearchClientDatePipe } from './pipes/search-client-date.pipe';
import { SearchClientWebsitePipe } from './pipes/search-client-website.pipe';
import { SearchClientCreatedbyPipe } from './pipes/search-client-createdby.pipe';

const appRoutes : Routes = [
  {path : '', redirectTo : 'login', pathMatch : 'full'},
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
  {path : 'view-products', component :ViewProductsComponent},
  {path : 'login', component : LoginComponent},
  {path : 'signup', component : SignupComponent},
  {path : 'users', component : UsersDashboardComponent},
  {path : 'view-users', component : ViewUsersComponent},
  {path : 'deleted-orders', component : DeletedOrdersComponent},
  {path : 'analysis', component : AnalisisDashboardComponent},
  {path : 'analysis-product', component : AnalysisProductComponent},
  {path : 'analysis-company', component : AnalysisCompanyComponent},
  {path : 'analysis-employee', component : AnalysisEmployeeComponent}
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
    ViewProductsComponent,
    SearchClientNamePipe,
    SearchOrderClientPipe,
    LoginComponent,
    SignupComponent,
    UsersDashboardComponent,
    SearchProductPipe,
    ViewUsersComponent,
    SearchUserPipe,
    SearchCompanyPipe,
    DeletedOrdersComponent,
    AnalisisDashboardComponent,
    AnalysisProductComponent,
    AnalysisCompanyComponent,
    AnalysisEmployeeComponent,
    SearchOrderIdPipe,
    SearchOrderEmailPipe,
    SearchOrderStatusPipe,
    SearchOrderCompanyPipe,
    SearchOrderDatePipe,
    SearchOrderPricePipe,
    SearchClientGenderPipe,
    SearchClientEmailPipe,
    SearchClientCompanyPipe,
    SearchClientStatusPipe,
    SearchClientDatePipe,
    SearchClientWebsitePipe,
    SearchClientCreatedbyPipe
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
  providers: [DatabaseService, ValidateService, AuthService, DatePipe, ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
