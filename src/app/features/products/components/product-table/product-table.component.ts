import { Component, input, output, signal, computed } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductRowComponent } from '../product-row/product-row.component';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [ProductRowComponent],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css',
})
export class ProductTableComponent {
  products = input.required<Product[]>();
  editClicked = output<Product>();
  menuClicked = output<Product>();

  selectedIds = signal<Set<string>>(new Set());

  allSelected = computed(() => {
    const ids = this.selectedIds();
    return this.products().length > 0 && this.products().every(p => ids.has(p.id));
  });

  isSelected(id: string) {
    return this.selectedIds().has(id);
  }

  toggleAll(checked: boolean) {
    this.selectedIds.set(checked ? new Set(this.products().map(p => p.id)) : new Set());
  }

  toggleOne(id: string, checked: boolean) {
    this.selectedIds.update(ids => {
      const next = new Set(ids);
      checked ? next.add(id) : next.delete(id);
      return next;
    });
  }
}
