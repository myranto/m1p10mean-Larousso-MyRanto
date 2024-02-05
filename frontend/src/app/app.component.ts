import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,

  ],
  providers:[ ConfirmationService,
    MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'm1p10mean-Larousso-MyRanto';
}
