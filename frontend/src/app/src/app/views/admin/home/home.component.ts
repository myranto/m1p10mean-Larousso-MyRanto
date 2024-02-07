import { Component} from '@angular/core';
import {ListComponent} from "../../utils/list/list.component";
import {EmployeComponentComponent} from "../../employe/employe-component/employe-component.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ListComponent, EmployeComponentComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
