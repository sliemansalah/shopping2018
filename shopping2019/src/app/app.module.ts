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
import { DataStorageService } from './shared/data-storage.service';
import { MainProvider } from './shared/headers';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AllOffersComponent } from './pages/offers/all-offers/all-offers.component';
import { AddOffersComponent } from './pages/offers/add-offers/add-offers.component';
import { OffersService } from './pages/offers/offers.service';
import { OffersFormComponent } from './components/offers-form/offers-form.component';
import { ServicesService } from './pages/services/services.service';
import { ServicesComponent } from './pages/services/services.component';
import { LoginComponent } from './pages/login/login.component';
import { ListComponent } from './maingroups/list/list.component';
import { AddComponent } from './maingroups/add/add.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './guards/auth.service';
import { RoleGuard } from './guards/role.guard';
@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    HomePageComponent,
    FooterComponent,
    HeaderComponent,
    NotFoundComponent,
    AllOffersComponent,
    AddOffersComponent,
    OffersFormComponent,
    ServicesComponent,
    LoginComponent,
    ListComponent,
    AddComponent
  ],
  // tslint:disable-next-line:max-line-length
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpModule, HttpClientModule, AlifeFileToBase64Module, SelectDropDownModule, BrowserAnimationsModule],
  providers: [
    DataStorageService,
    MainProvider, //
    OffersService,
    ServicesService,
    AuthGuard,
    AuthService,
    RoleGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
