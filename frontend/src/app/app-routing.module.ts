import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import {ServiceComponent} from "./views/admin/service/service.component";
import {HomeCustomerComponent} from "./views/customer/home-customer/home-customer.component";
import {PersonListComponent} from "./views/employe/employe-component/person-list.component";
import {HomeComponent} from "./views/admin/home/home.component";
import {RecoverycomponentComponent} from "./views/authentification/recoverycomponent/recoverycomponent.component";
import {RegisterComponent} from "./views/authentification/register/register.component";
import {AuthentificationComponent} from "./views/authentification/authentification.component";
import {TypeCostComponent} from "./views/admin/typeCost/type-cost.component";
import {AuthGuard} from "./auth-guard";
import {DiscountComponent} from "./views/admin/discount/discount.component";
import { AskAppointmentComponent } from './views/customer/ask-appointment/ask-appointment.component';
import { AppointmentComponent } from './views/customer/appointment/appointment.component';
import { EmpAppointmentComponent } from './views/employe/emp-appointment/emp-appointment.component';
import {McalendarComponent} from "./demo/components/mcalendar/mcalendar.component";
import { EmpProfileComponent } from './views/employe/emp-profile/emp-profile.component';
import { CustomerProfileComponent } from './views/customer/customer-profile/customer-profile.component';
import {HomeEmployeComponent} from "./views/employe/home-employe/home-employe.component";
import {CommissionComponent} from "./views/employe/commission/commission.component";
import { SpentComponent } from './views/admin/spent/spent.component';
import { AdminDashboardComponent } from './views/admin/admin-dashboard/admin-dashboard.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'views', component: AppLayoutComponent,
                canActivate: [AuthGuard],
                children: [
                    { path: 'admin/service', component: ServiceComponent },
                    { path: 'admin/discount', component: DiscountComponent },
                    { path: 'admin/home', component: HomeComponent },
                    { path: 'admin/type_cost',component:TypeCostComponent},
                    { path: 'admin/calendar',component:McalendarComponent},
                    { path: 'admin/person',component: PersonListComponent },
                    { path: 'admin/spent',component:SpentComponent},
                    { path: 'admin/dashboard',component:AdminDashboardComponent},
                    { path: 'customer/home-customer',component: HomeCustomerComponent },
                    { path: 'customer/ask_appointment',component: AskAppointmentComponent },
                    { path: 'customer/appointment',component: AppointmentComponent },
                    { path: 'customer/profile',component: CustomerProfileComponent },
                    { path: 'employe/appointment',component: EmpAppointmentComponent },
                    { path: 'employe/home',component: HomeEmployeComponent },
                    { path: 'employe/commission',component: CommissionComponent },
                    { path: 'employe/profile',component: EmpProfileComponent}
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
            // { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
