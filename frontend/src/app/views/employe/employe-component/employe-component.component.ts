import {ChangeDetectorRef, Component} from '@angular/core';
import {User} from "../../interfaces/user";
import {PersonService} from "../../services/person/person-service";
import {ListComponent} from "../../utils/list/list.component";
import {FormComponent} from "./form/form.component";
import {RefreshService} from "../../utils/refresh-service";

@Component({
  selector: 'app-employe-component',
  standalone: true,
  imports: [
    ListComponent
  ],
  templateUrl: './employe-component.component.html',
  styleUrl: './employe-component.component.scss'
})
export class EmployeComponentComponent {
  employe_list:User[] = []

  constructor(private user:PersonService, private ref:ChangeDetectorRef,private refreshService: RefreshService) {
    this.drop = this.drop.bind(this);
    this.findAllEmploye()
    this.refreshService.refresh.subscribe(() => this.findAllEmploye());
  }

  findAllEmploye(){
    this.user.findByrole('employe')
      .then((list)=>this.employe_list = list)
      .catch((error)=>console.log('ito le message'+error.message))
  }

  getPersonneLink(row:any) {
    return `/element/personne/${row._id}`;
  }

  column:any= [
    {
      name:'Nom',
      selector:(row:any)=>row?.name,
      sortable:true,
    },
    {
      name:'E-mail',
      selector:(row:any)=>row?.mail,
      sortable:true,
    },
    {
      name:'role',
      selector:(row:any)=>row?.role,
      sortable:true,
    },
  ]
  async drop(row: any) {
    if (this.user) {
      await this.user.deletePersonById(row._id)
      this.findAllEmploye()
      this.ref.detectChanges();
    }
  }

  protected readonly FormComponent = FormComponent;
}
