import {DynamicDialogRef} from "primeng/dynamicdialog";
import {RefreshService} from "./refresh-service";
import {inject} from "@angular/core";
import {MessageService} from "primeng/api";

export class Base {
  refreshService= inject(RefreshService)
    ref = inject(DynamicDialogRef)
    public messageService = inject(MessageService)
    data:string
  constructor() {
  }
    close(){
        this.ref.close()
    }
  submit(){
    this.refreshService.triggerRefresh();
      this.ref.close(this.data);
  }
}
