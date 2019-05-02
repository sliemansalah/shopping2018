import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AddTechnicalComponent } from './pages/technicians/add-technical/add-technical.component';
import { DataStorageService } from './shared/data-storage.service';
import { MainProvider } from './shared/headers';
import { AllTechniciansComponent } from './pages/technicians/all-technicians/all-technicians.component';
import { TechnicalFormComponent } from './components/technical-form/technical-form.component';
import { ResourcesComponent } from './pages/resources/resources.component';
import { AddResourceComponent } from './pages/resources/add-resource/add-resource.component';
import { ResourcesFormComponent } from './components/resources-form/resources-form.component';
import { ResourceService } from './pages/resources/resources.service';
import { ResourceInnerComponent } from './pages/resources/resource-inner/resource-inner.component';
import { ResourceEmployeeFormComponent } from './components/resource-employee-form/resource-employee-form.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ClientsComponent } from './pages/clients/all-clients/clients.component';
import { AddClientComponent } from './pages/clients/add-client/add-client.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ClientsService } from './pages/clients/clients.service';
import { AllOffersComponent } from './pages/offers/all-offers/all-offers.component';
import { AddOffersComponent } from './pages/offers/add-offers/add-offers.component';
import { OffersService } from './pages/offers/offers.service';
import { OffersFormComponent } from './components/offers-form/offers-form.component';
import { ServicesFormComponent } from './components/services-form/services-form.component';
import { ServicesService } from './pages/services/services.service';
import { ServicesComponent } from './pages/services/services.component';
import { AddOrderComponent } from './pages/orders/add-order/add-order.component';
import { AllOrdersComponent } from './pages/orders/all-orders/all-orders.component';
import { OrdersService } from './pages/orders/orders.service';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './guards/auth.service';
import { RoleGuard } from './guards/role.guard';

@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [
    AppComponent,
    SideNavComponent,
    HomePageComponent,
    FooterComponent,
    HeaderComponent,
    AddTechnicalComponent,
    AllTechniciansComponent,
    TechnicalFormComponent,
    ResourcesComponent,
    AddResourceComponent,
    ResourcesFormComponent,
    ResourceInnerComponent,
    ResourceEmployeeFormComponent,
    NotFoundComponent,
    ClientsComponent,
    AddClientComponent,
    ClientFormComponent,
    AllOffersComponent,
    AddOffersComponent,
    OffersFormComponent,
    ServicesFormComponent,
    ServicesComponent,
    AddOrderComponent,
    AllOrdersComponent,
    OrderFormComponent,
    LoginComponent
  ],
  // tslint:disable-next-line:max-line-length
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpModule, HttpClientModule, AlifeFileToBase64Module, SelectDropDownModule, BrowserAnimationsModule],
  providers: [
    DataStorageService,
    MainProvider, //
    ResourceService,
    ClientsService,
    OffersService,
    ServicesService,
    OrdersService,
    AuthGuard,
    AuthService,
    RoleGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
