import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import {getProfileStorage} from "../../api-request";
import {MenuAdmin, MenuCustomer, MenuEmploye} from "../menu";

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService ) {

    }

    ngOnInit() {
        const profile= getProfileStorage()
        switch (profile.role) {
            case 'admin':
                this.model = MenuAdmin
                break
            case 'customer':
                this.model = MenuCustomer
                break
            case 'employe':
                this.model = MenuEmploye
                break
            default:
                break
        }
    }
}
