import { Component, ElementRef, ViewChild } from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import {Router} from "@angular/router";
import {removeProfileStorage} from "../../api-request";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,private router: Router, private  message:MessageService) { }
    async logOut() {
        removeProfileStorage()
        this.message.add({ severity: 'success', summary: 'Succès', detail: 'déconnexion réussi' });
        await this.router.navigate(['/'])
    }
}
