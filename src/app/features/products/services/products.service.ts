import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../../../environments/environment';

export type SortField = 'name' | 'category';
export type SortDir = 'asc' | 'desc';

export interface ProductFilters {
  search: string;
  sortField: SortField;
  sortDir: SortDir;
  collectionType: string;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);
  private readonly all = signal<Product[]>([]);

  filters = signal<ProductFilters>({
    search: '',
    sortField: 'name',
    sortDir: 'asc',
    collectionType: '',
  });

  filtered = computed(() => {
    const { search, sortField, sortDir, collectionType } = this.filters();
    let list = [...this.all()];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.name.toLowerCase().includes(q)
      );
    }

    if (collectionType) {
      list = list.filter(p => p.category.name === collectionType);
    }

    list.sort((a, b) => {
      let cmp = 0;
      if (sortField === 'name') cmp = a.name.localeCompare(b.name);
      else if (sortField === 'category') cmp = a.category.name.localeCompare(b.category.name);
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
        p.category.name.toLowerCase().includes(q)
      )
      .slice(0, 4);
  });

  updateFilters(partial: Partial<ProductFilters>) {
    this.filters.update(f => ({ ...f, ...partial }));
  }

  fetchProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseUrlBack}/products`, {
      withCredentials: true,
    }).pipe(tap(products => this.all.set(products)));
  }
}
