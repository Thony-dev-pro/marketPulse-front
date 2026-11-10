import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';

export interface Category {
  id: number;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class ProductModalService {
  private http = inject(HttpClient);
  private base = environment.baseUrlBack;

  getCategories() {
    return this.http.get<Category[]>(`${this.base}/categories`, { withCredentials: true });
  }
}
