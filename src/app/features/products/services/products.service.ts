import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';
import { PRODUCTS_MOCK } from '../data/products.mock';

export type SortField = 'name' | 'price' | 'rating';
export type SortDir = 'asc' | 'desc';

export interface ProductFilters {
  search: string;
  sortField: SortField;
  sortDir: SortDir;
  collectionType: string;
  priceRange: { min: number; max: number } | null;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly all = signal<Product[]>(PRODUCTS_MOCK);

  filters = signal<ProductFilters>({
    search: '',
    sortField: 'name',
    sortDir: 'asc',
    collectionType: '',
    priceRange: null,
  });

  filtered = computed(() => {
    const { search, sortField, sortDir, collectionType, priceRange } = this.filters();
    let list = [...this.all()];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.categories.some(c => c.toLowerCase().includes(q))
      );
    }

    if (collectionType) {
      list = list.filter(p => p.categories.includes(collectionType));
    }

    if (priceRange) {
      list = list.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);
    }

    list.sort((a, b) => {
      let cmp = 0;
      if (sortField === 'name') cmp = a.name.localeCompare(b.name);
      else if (sortField === 'price') cmp = a.price - b.price;
      else if (sortField === 'rating') cmp = a.rating - b.rating;
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return list;
  });

  searchSuggestions = computed(() => {
    const q = this.filters().search.toLowerCase().trim();
    if (!q) return [];
    return this.all()
      .filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.categories.some(c => c.toLowerCase().includes(q))
      )
      .slice(0, 4);
  });

  updateFilters(partial: Partial<ProductFilters>) {
    this.filters.update(f => ({ ...f, ...partial }));
  }
}
