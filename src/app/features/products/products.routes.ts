import { Routes } from '@angular/router';

export const productsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./products-page/products-page.component').then(m => m.ProductsPageComponent),
  },
];
