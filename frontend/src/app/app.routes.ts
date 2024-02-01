import { Routes } from '@angular/router';
import { ServiceComponent } from './admin/service/service.component';
import {AuthentificationComponent} from "./authentification/authentification.component";
import {RegisterComponent} from "./authentification/register/register.component";

export const routes: Routes = [
    {
        path:'admin/service',
        component:ServiceComponent
    },
    {
      path:'',
      component:AuthentificationComponent
    },
    {
      path:'authentification/register',
      component:RegisterComponent
    }
];
