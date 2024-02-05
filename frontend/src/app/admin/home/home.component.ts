import {Component, inject} from '@angular/core';
import {ListComponent} from "../../utils/list/list.component";
import {User} from "../../interfaces/user";
import {PersonService} from "../../services/person/person-service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  user = inject(PersonService)
  getPersonneLink(row:any) {
    return `/element/personne/${row._id}`;
  }

  //add attribute link
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
  employe_list:User[] = []
  async drop(row: any) {
    console.log(this.user)
    if (this.user) {
      console.log(row)
      await this.user.deletePersonById(row._id)
    }
  }
  constructor() {
    this.user.findByrole('employe')
      .then((list)=>this.employe_list = list)
      .catch((error)=>console.log('ito le message'+error.message))
  }
}
