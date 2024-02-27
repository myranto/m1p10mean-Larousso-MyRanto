import { Component} from '@angular/core';
import {ListComponent} from "../../utils/list/list.component";
import {PersonListComponent} from "../../employe/employe-component/person-list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ListComponent, PersonListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
