import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ProductTableComponent } from '../components/product-table/product-table.component';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [ProductTableComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
})
export class ProductsPageComponent implements OnInit {
  private svc = inject(ProductsService);
  products = this.svc.filtered;

  ngOnInit() {
    this.svc.fetchProducts().subscribe({
      next: (res) => console.log('Products fetched:', res),
      error: (err) => console.error('Failed to fetch products:', err),
    });
  }

  onNewProduct() {
    console.log('New product clicked');
  }

  onEdit(product: Product) {
    console.log('Edit clicked:', product);
  }

  onMenu(product: Product) {
    console.log('Menu clicked:', product);
  }
}
