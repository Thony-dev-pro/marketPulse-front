import { Component, output, OnInit, inject, signal, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductModalService, Category } from '../product-modal/services/product-modal.service';
import { Product } from '../../models/product.model';

export interface ProductFormData {
  name: string;
  description: string;
  category_id: number;
  unit: string;
  status: number;
}

@Component({
  selector: 'app-product-edit-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-edit-modal.component.html',
  styleUrl: './product-edit-modal.component.css',
})
export class ProductEditModalComponent implements OnInit {
  close = output<void>();
  save = output<ProductFormData>();
  categories = signal<Category[]>([]);
  product = input<Product | null>(null);

  private fb = inject(FormBuilder);
  private productModalService = inject(ProductModalService);
  form = this.fb.group({
    name: ['', [Validators.required]],
    description: [''],
    category_id: [1, [Validators.required]],
    unit: ['unit', [Validators.required]],
    status: [1, [Validators.required]],
  });

  closeModal() {
    this.close.emit();
  }

  onSubmit() {
    if (this.form.valid) {
      this.save.emit(this.form.value as ProductFormData);
      this.closeModal();
    }
  }

  ngOnInit() {
    this.productModalService.getCategories().subscribe(data => this.categories.set(data));

    const p = this.product();
    if (p) {
      this.form.patchValue({
        name: p.name,
        description: p.description || '',
        category_id: p.category_id,
        unit: p.unit,
        status: p.status,
      });
    }
  }
}
