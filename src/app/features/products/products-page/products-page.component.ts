import { Component, inject } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ProductToolbarComponent } from '../components/product-toolbar/product-toolbar.component';
import { ProductTableComponent } from '../components/product-table/product-table.component';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [ProductToolbarComponent, ProductTableComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
})
export class ProductsPageComponent {
  private svc = inject(ProductsService);
  products = this.svc.filtered;

  onNewProduct() {
    console.log('New product clicked');
  }

  onProductSelected(product: Product) {
    console.log('Product selected from search:', product);
  }

  onEdit(product: Product) {
    console.log('Edit clicked:', product);
  }

  onMenu(product: Product) {
    console.log('Menu clicked:', product);
  }
}
