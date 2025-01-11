import { Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FarmerDashboardComponent } from './components/farmer-dashboard/farmer-dashboard.component';
import { DealerDashboardComponent } from './components/dealer-dashboard/dealer-dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CropsComponent } from './components/crops/crops.component';
import { OrdersComponent } from './components/orders/orders.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'farmer-dashboard', component: FarmerDashboardComponent },
  { path: 'dealer-dashboard', component: DealerDashboardComponent },
  {path:  'profile', component:ProfileComponent},
  {path:'crops',component:CropsComponent},
  {path: 'orders', component: OrdersComponent},
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
];
