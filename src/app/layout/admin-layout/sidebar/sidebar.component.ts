import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export const APP_NAME = 'ClarityUI';

export interface MenuItem {
  label: string;
  icon: string;
  route: string;
  badge?: { text: string; variant: 'purple' | 'gray' };
}

export interface MenuGroup {
  label?: string;
  items: MenuItem[];
}

export const MENU: MenuGroup[] = [
  {
    items: [
      { label: 'Dashboard', icon: 'dashboard', route: '/admin/dashboard' },
    ],
  },
  {
    label: 'ANALYTICS',
    items: [
      { label: 'Performance', icon: 'performance', route: '/admin/performance' },
      { label: 'Hotjar', icon: 'hotjar', route: '/admin/hotjar', badge: { text: 'NEW', variant: 'purple' } },
    ],
  },
  {
    label: 'SUPPORT',
    items: [
      { label: 'Tickets', icon: 'tickets', route: '/admin/tickets', badge: { text: '15', variant: 'gray' } },
      { label: 'Agents', icon: 'agents', route: '/admin/agents' },
      { label: 'Customers', icon: 'customers', route: '/admin/customers' },
    ],
  },
  {
    label: 'SHOP',
    items: [
      { label: 'Products', icon: 'products', route: '/admin/products' },
      { label: 'Orders', icon: 'orders', route: '/admin/orders' },
      { label: 'Reports', icon: 'reports', route: '/admin/reports' },
    ],
  },
];

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  open = input(true);
  closed = output<void>();

  appName = APP_NAME;
  menu = MENU;

  close() {
    this.closed.emit();
  }
}
