import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService, CreateProduct } from '../services/products.service';
import { ProductTableComponent } from '../components/product-table/product-table.component';
import { ProductModalComponent } from '../components/product-modal/product-modal.component';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [ProductTableComponent, ProductModalComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
})
export class ProductsPageComponent implements OnInit {
  private svc = inject(ProductsService);
  products = this.svc.filtered;
  modalOpen = signal(false);

  ngOnInit() {
    this.svc.fetchProducts().subscribe({
      next: (res) => console.log('Products fetched:', res),
      error: (err) => console.error('Failed to fetch products:', err),
    });
  }

  onNewProduct() {
    this.modalOpen.set(true);
  }

  onEdit(product: Product) {
    console.log('Edit clicked:', product);
  }

  onDesactivate(product: Product) {
    this.svc.desactivateProduct(product.id).subscribe();
  }

  onMenu(product: Product) {
    console.log('Menu clicked:', product);
  }

  onSaveProduct(data: CreateProduct) {
    this.svc.createProduct(data).subscribe();
    this.modalOpen.set(false);
  }
}
