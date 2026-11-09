import { Component, output, signal, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductModalService, Category } from './services/product-modal.service';

export interface ProductFormData {
  name: string;
  description: string;
  category_id: number;
  unit: string;
  status: number;
}

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.css',
})
export class ProductModalComponent implements OnInit {
  close = output<void>();
  save = output<ProductFormData>();

  isOpen = signal(false);
  categories = signal<Category[]>([]);
  private fb = inject(FormBuilder);
  private productModalService = inject(ProductModalService);
  form = this.fb.group({
    name: ['', [Validators.required]],
    description: [''],
    category_id: [1, [Validators.required]],
    unit: ['unit', [Validators.required]],
    status: [1, [Validators.required]],
  });

  open() {
    this.isOpen.set(true);
  }

  ngOnInit() {
    this.productModalService.getCategories().subscribe(data => this.categories.set(data));
  }

  closeModal() {
    this.isOpen.set(false);
    this.close.emit();
  }

  onSubmit() {
    if (this.form.valid) {
      this.save.emit(this.form.value as ProductFormData);
      this.closeModal();
    }
  }
}
