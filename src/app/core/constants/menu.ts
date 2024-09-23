import { MenuModels } from '../models/menu.models.';

export class Menu {
  public static pages: MenuModels[] = [
    {
      group: 'Job Order',
      separator: false,
      items: [
        {
          icon: 'icons/heroicons/outline/chart-pie.svg',
          label: 'Transactions',
          route: '/customer/home',
        },
      ],
    },
    {
      group: 'Admin',
      separator: true,
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
        {
          icon: 'icons/heroicons/outline/users.svg',
          label: 'Users',
          route: '/admin/users',
        },
      ],
    },
    {
      group: 'Manager',
      separator: false,
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
        {
          icon: 'icons/heroicons/outline/folder.svg',
          label: 'Folders',
          route: '/folders',
          children: [
            { label: 'Current Files', route: '/folders/current-files' },
            { label: 'Downloads', route: '/folders/download' },
            { label: 'Trash', route: '/folders/trash' },
          ],
        },
      ],
    },
  ];
}
