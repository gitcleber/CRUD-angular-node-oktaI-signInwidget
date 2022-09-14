import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OktaCallbackComponent,OktaAuthGuard } from '@okta/okta-angular';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path:'', component: HomeComponent},
  { path: 'products', component: ProductsComponent, canActivate: [OktaAuthGuard]},
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'profile', component: ProfileComponent, canActivate:[OktaAuthGuard]},
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
