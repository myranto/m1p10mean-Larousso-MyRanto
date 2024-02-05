import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  refreshEmploye = new Subject<void>();

  triggerRefresh() {
    this.refreshEmploye.next();
  }
}
