import { Routes } from '@angular/router';
import { authGuard } from '../../guards/auth.guard';

export const adminRoutes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('../../layout/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../../pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'performance',
        data: { title: 'Performance' },
        loadComponent: () =>
          import('../../pages/placeholder/placeholder-page.component').then(m => m.PlaceholderPageComponent),
      },
      {
        path: 'hotjar',
        data: { title: 'Hotjar' },
        loadComponent: () =>
          import('../../pages/placeholder/placeholder-page.component').then(m => m.PlaceholderPageComponent),
      },
      {
        path: 'tickets',
        data: { title: 'Tickets' },
        loadComponent: () =>
          import('../../pages/placeholder/placeholder-page.component').then(m => m.PlaceholderPageComponent),
      },
      {
        path: 'agents',
        data: { title: 'Agents' },
        loadComponent: () =>
          import('../../pages/placeholder/placeholder-page.component').then(m => m.PlaceholderPageComponent),
      },
      {
        path: 'customers',
        data: { title: 'Customers' },
        loadComponent: () =>
          import('../../pages/placeholder/placeholder-page.component').then(m => m.PlaceholderPageComponent),
      },
      {
        path: 'products',
        data: { title: 'Products' },
        loadComponent: () =>
          import('../../pages/placeholder/placeholder-page.component').then(m => m.PlaceholderPageComponent),
      },
      {
        path: 'orders',
        data: { title: 'Orders' },
        loadComponent: () =>
          import('../../pages/placeholder/placeholder-page.component').then(m => m.PlaceholderPageComponent),
      },
      {
        path: 'reports',
        data: { title: 'Reports' },
        loadComponent: () =>
          import('../../pages/placeholder/placeholder-page.component').then(m => m.PlaceholderPageComponent),
      },
    ],
  },
];
