import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddTechnicalComponent } from "./pages/technicians/add-technical/add-technical.component";
import { AllTechniciansComponent } from "./pages/technicians/all-technicians/all-technicians.component";
import { ResourcesComponent } from "./pages/resources/resources.component";
import { AddResourceComponent } from "./pages/resources/add-resource/add-resource.component";
import { ResourceInnerComponent } from "./pages/resources/resource-inner/resource-inner.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { AddClientComponent } from "./pages/clients/add-client/add-client.component";
import { ClientsComponent } from "./pages/clients/all-clients/clients.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { AddOffersComponent } from "./pages/offers/add-offers/add-offers.component";
import { AllOffersComponent } from "./pages/offers/all-offers/all-offers.component";
import { ServicesComponent } from "./pages/services/services.component";
import { AllOrdersComponent } from "./pages/orders/all-orders/all-orders.component";
import { AddOrderComponent } from "./pages/orders/add-order/add-order.component";
import { LoginComponent } from "./pages/login/login.component";
import { AuthGuard } from "./guards/auth.guard";
import { RoleGuard } from "./guards/role.guard";

const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "add-technical", component: AddTechnicalComponent, canActivate: [RoleGuard], data: { accessRoles: "super-admin" } },
  { path: "all-technicians/page/:id", component: AllTechniciansComponent, pathMatch: "full" },
  { path: "resources", component: ResourcesComponent },
  { path: "resources/add-resource", component: AddResourceComponent },
  { path: "resources/:id", component: ResourceInnerComponent },
  { path: "add-client", component: AddClientComponent },
  { path: "all-clients/page/:id", component: ClientsComponent },
  { path: "add-offer", component: AddOffersComponent },
  { path: "all-offers/page/:id", component: AllOffersComponent },
  { path: "services", component: ServicesComponent },
  { path: "all-orders/page/:id", component: AllOrdersComponent },
  { path: "add-order", component: AddOrderComponent },

  { path: "login", component: LoginComponent },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
