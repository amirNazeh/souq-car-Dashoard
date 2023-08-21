import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddCarsComponent } from "./Components/add-cars/add-cars.component";
import { EditAndDeleteCarsComponent } from "./Components/edit-and-delete-cars/edit-and-delete-cars.component";
import { LoginComponent } from "./Components/login/login.component";
import { AuthGuard } from "./Guards/auth.guard";

const routes: Routes = [
  { path: "login", redirectTo: "/login", pathMatch: "full" },
  {
    path: "login",
    component: LoginComponent,
    title: "Login",
  },
  {
    path: "add-cars",
    component: AddCarsComponent,
    title: "Add Cars",
    canActivate: [AuthGuard],
  },
  {
    path: "edit-and-delete-cars",
    component: EditAndDeleteCarsComponent,
    title: "Edit & Delete Cars",
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
