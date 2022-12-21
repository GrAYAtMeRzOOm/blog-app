import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";

// admin views
import { PostManagementComponent } from "./views/admin/post-management/post-management.component";
import { ChangePasswordComponent } from "./views/admin/change-password/change-password.component";


// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";

// no layouts views
import { BlogComponent } from "./views/blog/blog.component";

const routes: Routes = [
  // admin views
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "post-management", component: PostManagementComponent },
      { path: "change-password", component: ChangePasswordComponent },
      { path: "", redirectTo: "post-management", pathMatch: "full" },
    ],
  },
  // auth views
  //auth/sample
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
    ],
  },
  // no layout views
  { path: "blog", component: BlogComponent },
  { path: "authenticate", component: ChangePasswordComponent },
  { path: "", component: BlogComponent },
  { path: "**", redirectTo: "", pathMatch: "full" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
