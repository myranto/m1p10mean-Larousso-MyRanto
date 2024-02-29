export const MenuCustomer =  [
    {
        label: '',
        items: [
            { label: 'Accueil', icon: 'pi pi-fw pi-home', routerLink: ['customer/home-customer'] }
        ]
    },
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
            label: 'Accueil',
            items: [
                { label: 'Tableau de bord', icon: 'pi pi-fw pi-home', routerLink: ['admin/dashboard'] }
            ]
        },
        {
            label: 'Ressources',
            items: [
                { label: 'Services', icon: 'pi pi-fw pi-bookmark-fill', routerLink: ['admin/service'] },
                { label: 'Type dépense', icon: 'pi pi-fw pi-money-bill', routerLink: ['admin/type_cost'] },
                { label: 'Offres spéciales', icon: 'pi pi-fw pi-star-fill', routerLink: ['admin/discount'] },
                { label: 'Calendrier', icon: 'pi pi-fw pi-calendar', routerLink: ['admin/calendar'] }
            ]
        },
        {
            label: 'Gestion personne',
            items: [
                { label: 'Employées', icon: 'pi pi-fw pi-user-edit', routerLink: ['admin/home'] },
                { label: 'Clients', icon: 'pi pi-fw pi-user', routerLink: ['admin/person'], queryParams:{role: 'customer'} },
                { label: 'Dépenses', icon: 'pi pi-fw pi-chart-bar', routerLink: ['admin/spent'] },
            ]
        },
    ]

export const MenuEmploye= [
    {
        label: '',
        items: [
            { label: 'Accueil', icon: 'pi pi-fw pi-home', routerLink: ['admin/dashboard'] }
        ]
    },
    {
        label :'Rendez-vous',
        items:[
            { label:'Historique des rendez-vous',icon:'pi pi-calendar', routerLink:['employe/appointment'] },
            { label: 'Calendrier', icon: 'pi pi-fw pi-calendar', routerLink: ['admin/calendar'] },
            { label: 'Commission', icon: 'pi pi-fw pi-percentage', routerLink: ['employe/commission'] }
        ]
    },
    {
        label:"Profile",
        items : [
            { label:"Modifier",icon:"pi pi-pencil",routerLink:['employe/profile']}
        ]
    }
]
