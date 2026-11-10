import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

export interface Category {
  id: number;
  name: string;
}

export interface CreateProduct {
  name: string;
  category_id: number;
  description: string;
  unit: string;
  status: number;
}

@Injectable({ providedIn: 'root' })
export class ProductModalService {
  private http = inject(HttpClient);
  private base = environment.baseUrlBack;

  getCategories() {
    return this.http.get<Category[]>(`${this.base}/categories`, { withCredentials: true });
  }

  createProduct(product: CreateProduct): Observable<void> {
    return this.http.post<void>(`${this.base}/products`, product, { withCredentials: true });
  }
}
