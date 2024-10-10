import { MenuModels } from '../models/menu.models.';

export class Menu {
  public static pages: MenuModels[] = [
    {
      group: 'Job Order',
      separator: false,
      roles: ['customer'],
      items: [
        {
          icon: 'icons/heroicons/solid/document.svg',
          label: 'Transactions',
          route: '/customer/home',
        },
      ],
    },
    {
      group: 'Admin',
      separator: true,
      roles: ['admin'],
      items: [
        {
          icon: 'icons/heroicons/solid/document.svg',
          label: 'Job Orders',
          route: '/download',
        },
        {
          icon: 'icons/heroicons/outline/gift.svg',
          label: 'Archive',
          route: '/gift',
        },
      ],
    },
    {
      group: 'Manage Work',
      separator: false,
      roles: ['manager'],
      items: [
        {
          icon: 'icons/heroicons/outline/cog.svg',
          label: 'Job Order Dashboard',
          route: '/settings',
        },
      ],
    },
    {
      group: 'Manage Records',
      separator: true,
      roles: ['manager'],
      items: [
        {
          icon: 'icons/heroicons/outline/document-text.svg',
          label: 'Customer Dashboard',
          route: '/records',
        },
      ],
    },
    {
      group: 'Manage Users',
      separator: true,
      roles: ['owner'],
      items: [
        {
          icon: 'icons/heroicons/outline/users.svg',
          label: 'Users',
          route: '/owner/users',
        },
      ],
    },
    {
      group: 'Analytics Dashboard',
      separator: true,
      roles: ['owner'],
      items: [
        {
          icon: 'icons/heroicons/outline/chart-pie.svg',
          label: 'Analytics Dashboard',
          route: '/owner/dashboard',
        },
      ]
    },
    {
      group: 'Tasks',
      separator: true,
      roles: ['technician'],
      items: [
        {
          icon: 'icons/heroicons/outline/check-circle.svg',
          label: 'Tasks',
          route: '/tasks',
        },
      ]
    }
  ];
}
