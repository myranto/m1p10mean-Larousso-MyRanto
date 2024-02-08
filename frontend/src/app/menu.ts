export const MenuCustomer =  []

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
                { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] }
            ]
        },
    ]

export const MenuEmploye= []
