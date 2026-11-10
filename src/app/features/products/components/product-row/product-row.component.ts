import { Component, input, output } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-row',
  standalone: true,
  imports: [],
  templateUrl: './product-row.component.html',
  styleUrl: './product-row.component.css',
})
export class ProductRowComponent {
  product = input.required<Product>();
  selected = input(false);
  selectionChanged = output<boolean>();
  editClicked = output<Product>();
  desactivateClicked = output<Product>();
  menuClicked = output<Product>();
}
