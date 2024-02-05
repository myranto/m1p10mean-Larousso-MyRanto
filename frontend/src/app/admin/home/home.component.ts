import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {ListComponent} from "../../utils/list/list.component";
import {User} from "../../interfaces/user";
import {PersonService} from "../../services/person/person-service";
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
