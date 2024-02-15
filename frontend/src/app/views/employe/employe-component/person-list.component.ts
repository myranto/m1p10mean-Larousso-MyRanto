import {ChangeDetectorRef, Component} from '@angular/core';
import {User} from "../../../utils/interfaces/user";
import {PersonService} from "../../../utils/services/person/person-service";
import {ListComponent} from "../../utils/list/list.component";
import {FormComponent} from "./form/form.component";
import {RefreshService} from "../../utils/refresh-service";
import {MaxRows} from "../../../../api-request";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-person-list-component',
  standalone: true,
  imports: [
    ListComponent
  ],
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.scss'
})
export class PersonListComponent {
  person_list:User[] = []
    page:number = 0
    row:number = MaxRows
    totalrow:number
    role = 'employe'
  constructor(private user:PersonService, private ref:ChangeDetectorRef,private refreshService: RefreshService,private route: ActivatedRoute) {
      let params = this.route.snapshot.queryParams;
      this.role = params['role'] ? params['role'] :'employe'
      this.drop = this.drop.bind(this)
    this.updatePage = this.updatePage.bind(this)
      this.user.countByrole(this.role)
          .then((count)=> this.totalrow = count)
    this.findAllEmploye()
    this.refreshService.refresh.subscribe(() => this.findAllEmploye());
  }
  updatePage(newPage,row){
      this.page =newPage
      this.row=row
      this.findAllEmploye()
      this.refreshService.triggerRefresh();
  }
  findAllEmploye(){
    this.user.findByrole(this.role,this.page,this.row)
      .then((list)=> {
          this.person_list = list
      })
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
      selector:(row:any)=> row?.role=='employe' ? 'employée' : 'client',
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