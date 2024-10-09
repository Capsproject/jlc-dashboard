import { MenuModels } from '../models/menu.models.';

export class Menu {
  public static pages: MenuModels[] = [
    {
      group: 'Job Order',
      separator: false,
      roles: ['customer'],
      items: [
        {
          icon: 'icons/heroicons/outline/folder-plus.svg',
          label: 'Request',
          route: '/customer/request',
        },
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
          icon: 'icons/heroicons/outline/download.svg',
          label: 'Download',
          route: '/download',
        },
        {
          icon: 'icons/heroicons/outline/gift.svg',
          label: 'Gift Card',
          route: '/gift',
        },
      ],
    },
    {
      group: 'All',
      separator: false,
      roles: ['manager'],
      items: [
        {
          icon: 'icons/heroicons/outline/cog.svg',
          label: 'Settings',
          route: '/settings',
        },
        {
          icon: 'icons/heroicons/outline/bell.svg',
          label: 'Notifications',
          route: '/gift',
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
    }
  ];
}
