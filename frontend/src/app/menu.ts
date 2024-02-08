export const MenuCustomer =  []

export const MenuAdmin= [
        {
            label: 'Home',
            items: [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['admin/home'] }
            ]
        },
        {
            label: 'Pages',
            items: [
                { label: 'Services', icon: 'pi pi-fw pi-id-card', routerLink: ['admin/service'] },
                { label: 'type cost', icon: 'pi pi-fw pi-check-square', routerLink: ['admin/type_cost'] },
                { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
                { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },
                { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] }
            ]
        },
    ]

export const MenuEmploye= []
