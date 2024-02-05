import { Routes } from '@angular/router';
import { ServiceComponent } from './admin/service/service.component';
import {AuthentificationComponent} from "./authentification/authentification.component";
import {RegisterComponent} from "./authentification/register/register.component";
import {HomeCustomerComponent} from "./customer/home-customer/home-customer.component";
import {EmployeComponentComponent} from "./employe/employe-component/employe-component.component";
import {HomeComponent} from "./admin/home/home.component";
import {RecoverycomponentComponent} from "./authentification/recoverycomponent/recoverycomponent.component";

export const routes: Routes = [
    {
        path:'admin/service',
        component:ServiceComponent
    },
    {
      path:'',
      redirectTo:'authentification',
      pathMatch:'full'
    },
    {
      path:'authentification',
      component:AuthentificationComponent
    },
    {
      path:'authentification/recoverycomponent',
      component:RecoverycomponentComponent
    },
    {
      path:'authentification/register',
      component:RegisterComponent
    },
    {
      path:'customer/home-customer',
      component:HomeCustomerComponent
    },
    {
      path:'employe/employe-component',
      component:EmployeComponentComponent
    },
    {
      path:'admin/home',
      component:HomeComponent
    }
];
