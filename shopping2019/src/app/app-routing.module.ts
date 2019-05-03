import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { LoginComponent } from "./pages/login/login.component";
import { ListComponent } from './maingroups/list/list.component';
import { AddComponent } from './maingroups/add/add.component';

const routes: Routes = [
  { path: "home", component: HomePageComponent },
  { path: "login", component: LoginComponent },
  { path: "", component: LoginComponent },
  { path: "maingroups", component: ListComponent },
  { path: "add-maingroups", component: AddComponent },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
