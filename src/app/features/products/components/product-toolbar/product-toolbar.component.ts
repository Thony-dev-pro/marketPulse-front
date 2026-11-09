import { Component, output, input, signal, inject, OnDestroy, ElementRef } from '@angular/core';
import { ProductsService, SortField, SortDir } from '../../services/products.service';
import { Product } from '../../models/product.model';

const COLLECTION_TYPES = ['', 'Furnitures', 'Chairs', 'Tables', 'Kitchens', 'Planets', 'Decor'];

@Component({
  selector: 'app-product-toolbar',
  standalone: true,
  imports: [],
  templateUrl: './product-toolbar.component.html',
  styleUrl: './product-toolbar.component.css',
})
export class ProductToolbarComponent implements OnDestroy {
  newProduct = output<void>();
  productSelected = output<Product>();

  private svc = inject(ProductsService);
  private el = inject(ElementRef);

  searchValue = signal('');
  dropdownOpen = signal(false);
  activeIndex = signal(-1);
  suggestions = this.svc.searchSuggestions;

  collectionTypes = COLLECTION_TYPES;

  private debounceTimer: ReturnType<typeof setTimeout> | null = null;
  private outsideClickHandler = (e: MouseEvent) => {
    if (!this.el.nativeElement.contains(e.target)) {
      this.dropdownOpen.set(false);
    }
  };

  constructor() {
    document.addEventListener('click', this.outsideClickHandler);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.outsideClickHandler);
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
  }

  onSearchInput(value: string) {
    this.searchValue.set(value);
    this.activeIndex.set(-1);
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.svc.updateFilters({ search: value });
      this.dropdownOpen.set(value.trim().length > 0);
    }, 200);
  }

  clearSearch() {
    this.searchValue.set('');
    this.svc.updateFilters({ search: '' });
    this.dropdownOpen.set(false);
  }

  onSearchKeydown(e: KeyboardEvent) {
    const len = this.suggestions().length;
    if (e.key === 'ArrowDown') { e.preventDefault(); this.activeIndex.update(i => Math.min(i + 1, len - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); this.activeIndex.update(i => Math.max(i - 1, -1)); }
    else if (e.key === 'Enter' && this.activeIndex() >= 0) { this.selectProduct(this.suggestions()[this.activeIndex()]); }
    else if (e.key === 'Escape') { this.dropdownOpen.set(false); }
  }

  selectProduct(p: Product) {
    this.searchValue.set(p.name);
    this.svc.updateFilters({ search: p.name });
    this.dropdownOpen.set(false);
    this.productSelected.emit(p);
  }

  onSortChange(e: Event) {
    const val = (e.target as HTMLSelectElement).value;
    const [field, dir] = val.split('-') as [SortField, SortDir];
    this.svc.updateFilters({ sortField: field, sortDir: dir });
  }

  onCollectionChange(e: Event) {
    this.svc.updateFilters({ collectionType: (e.target as HTMLSelectElement).value });
  }
}
