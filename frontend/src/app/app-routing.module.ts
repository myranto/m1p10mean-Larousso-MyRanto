import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import {ServiceComponent} from "./views/admin/service/service.component";
import {HomeCustomerComponent} from "./views/customer/home-customer/home-customer.component";
import {EmployeComponentComponent} from "./views/employe/employe-component/employe-component.component";
import {HomeComponent} from "./views/admin/home/home.component";
import {RecoverycomponentComponent} from "./views/authentification/recoverycomponent/recoverycomponent.component";
import {RegisterComponent} from "./views/authentification/register/register.component";
import {AuthentificationComponent} from "./views/authentification/authentification.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'views', component: AppLayoutComponent,
                children: [
                    // { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    // { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'admin/service', component: ServiceComponent },

                    {
                        path: 'customer/home-customer',
                        component: HomeCustomerComponent
                    },
                    {
                        path: 'employe/employe-component',
                        component: EmployeComponentComponent
                    },
                    {
                        path: 'admin/home',
                        component: HomeComponent
                    },
                ]
            },
            {
                path: 'authentification/recoverycomponent',
                component: RecoverycomponentComponent
            },
            {
                path: 'authentification/register',
                component: RegisterComponent
            },
            {
                path: '' ,
                component: AuthentificationComponent
            },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
