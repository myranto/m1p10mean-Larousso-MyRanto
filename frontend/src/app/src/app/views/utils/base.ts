import {DynamicDialogRef} from "primeng/dynamicdialog";
import {RefreshService} from "./refresh-service";
import {inject} from "@angular/core";

export class Base {
  refreshService= inject(RefreshService)
  constructor() {
  }
  submit(){
    this.refreshService.triggerRefresh();
  }
}
