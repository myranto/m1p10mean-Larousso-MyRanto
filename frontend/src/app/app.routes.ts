import { Routes } from '@angular/router';
import { ServiceComponent } from './admin/service/service.component';
import { TypeCostComponent } from './admin/typeCost/type-cost.component';

export const routes: Routes = [
    {
        path:'admin/service',
        component:ServiceComponent
    },
    {
        path:'admin/type_cost',
        component:TypeCostComponent
    }
];
