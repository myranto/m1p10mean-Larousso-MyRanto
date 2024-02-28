import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {MessageService} from "primeng/api";
import {getProfileStorage} from "../api-request";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private  message:MessageService) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        try {
            const profil = getProfileStorage();
            if (profil) {
                return true;
            } else {
                throw new Error('Veuillez-vous connecter')
            }

        }catch (e) {
            this.message.add({ severity: 'error', summary: 'Non Autorisé', detail: 'Veuillez-vous connecter' });
            this.router.navigate(['/']);
            return false;
        }
    }

}
