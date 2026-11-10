import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService, CreateProduct } from '../services/products.service';
import { ProductTableComponent } from '../components/product-table/product-table.component';
import { ProductModalComponent } from '../components/product-modal/product-modal.component';
import { ProductEditModalComponent } from '../components/product-edit-modal/product-edit-modal.component';
import { ProductToolbarComponent } from '../components/product-toolbar/product-toolbar.component';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [ProductTableComponent, ProductModalComponent, ProductEditModalComponent, ProductToolbarComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
})
export class ProductsPageComponent implements OnInit {
  private svc = inject(ProductsService);
  products = this.svc.filtered;
  modalOpen = signal(false);
  modalOpenEdit = signal(false);
  productEdit = signal<Product | null>(null);

  ngOnInit() {
    this.svc.fetchProducts().subscribe({
      next: (res) => console.log('Products fetched:', res),
      error: (err) => console.error('Failed to fetch products:', err),
    });
  }

  onEdit(product: Product) {
    console.log('Edit clicked:', product);
    this.productEdit.set(product);
    this.modalOpenEdit.set(true);
  }

  onSearchProduct(name: string) {
    this.svc.searchProducts(name).subscribe();
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

  onSaveEditProduct(data: CreateProduct) {
    const p = this.productEdit();
    if (p) {
      this.svc.updateProduct(p.id, data).subscribe();
    }
    this.modalOpenEdit.set(false);
  }
}
