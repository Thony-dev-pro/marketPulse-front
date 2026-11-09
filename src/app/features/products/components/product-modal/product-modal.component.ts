import { Component, output, signal, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

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
export class ProductModalComponent {
  close = output<void>();
  save = output<ProductFormData>();

  isOpen = signal(false);
  private fb = inject(FormBuilder);
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
