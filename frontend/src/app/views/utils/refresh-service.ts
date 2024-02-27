import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  refresh = new Subject<void>();

  triggerRefresh() {
    this.refresh.next();
  }
}
