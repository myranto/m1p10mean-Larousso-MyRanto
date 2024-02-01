import { Component, Inject, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { Service } from '../../../interfaces/service';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogClose,
  MatDialogModule
} from '@angular/material/dialog';
@Component({
  selector: 'service-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogClose,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  constructor(public dialogService : MatDialogRef<FormComponent>,@Inject(MAT_DIALOG_DATA) public model : Service){
  }

  onCancelClick() : void {
    this.dialogService.close();
  }
}
