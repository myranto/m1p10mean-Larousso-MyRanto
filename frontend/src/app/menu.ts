export const MenuCustomer =  [
    {
        label :'Rendez-vous',
        items:[
            { label:'Prendre un rendez-vous',icon:'pi pi-calendar', routerLink:['customer/ask_appointment'] },
            { label:'Historique des rendez-vous',icon:'pi pi-calendar', routerLink:['customer/appointment'] },
            { label: 'Calendrier', icon: 'pi pi-fw pi-calendar', routerLink: ['admin/calendar'] }
        ]
    },
    {
        label :'Profil',
        items:[
            { label:'Modifier votre profil',icon:'pi pi-person', routerLink:['customer/profile'] }
        ]
    }
]

export const MenuAdmin= [
        {
            label: 'Home',
            items: [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['admin/dashboard'] }
            ]
        },
        {
            label: 'Pages',
            items: [
                { label: 'Services', icon: 'pi pi-fw pi-bookmark-fill', routerLink: ['admin/service'] },
                { label: 'Employées', icon: 'pi pi-fw pi-user-edit', routerLink: ['admin/home'] },
                { label: 'Type dépense', icon: 'pi pi-fw pi-money-bill', routerLink: ['admin/type_cost'] },
                { label: 'Offres spéciales', icon: 'pi pi-fw pi-star-fill', routerLink: ['admin/discount'] },
                { label: 'Calendrier', icon: 'pi pi-fw pi-calendar', routerLink: ['admin/calendar'] }
            ]
        },
    ]

export const MenuEmploye= [
    {
        label :'Rendez-vous',
        items:[
            { label:'Historique des rendez-vous',icon:'pi pi-calendar', routerLink:['employe/appointment'] },
            { label: 'Calendrier', icon: 'pi pi-fw pi-calendar', routerLink: ['admin/calendar'] }
        ]
    },
    {
        label:"Profile",
        items : [
            { label:"Modifier",icon:"pi pi-pencil",routerLink:['employe/profile']}
        ]
    }
]
