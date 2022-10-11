// show prop is required to determine whether we want to display the link or not. We have conditions in palce inside Navigation route component

// Note: Conditions are written on the basis of text. Update there too if text is changed here.
export const links = [
    {
        text: 'Shop',
        route: '/shop',
        show: true
    },
    {
        text: 'Sign In',
        route: '/auth',
        show: true
    },
    {
        text: 'Sign Out',
        route: '/signout',
        show: true,
        onClick: () => {}
    },
    {
        route: '/cart',
        text: 'Cart',
        show: true,
        isIcon: true,
        IconComponent: 'CartIcon'
    }
]