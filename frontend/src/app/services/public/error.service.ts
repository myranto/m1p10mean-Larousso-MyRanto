import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from '../../public/error/error.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(public dialog : MatDialog) { }
  showError(error : string) : void {
    console.log(error);
    
    console.log(this.dialog);
    this.dialog.open(ErrorComponent,{
      data:{error},
    })
  }
}
