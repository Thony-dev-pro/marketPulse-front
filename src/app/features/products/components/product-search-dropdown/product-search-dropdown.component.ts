import { Component, input, output } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-search-dropdown',
  standalone: true,
  templateUrl: './product-search-dropdown.component.html',
  styleUrl: './product-search-dropdown.component.css',
})
export class ProductSearchDropdownComponent {
  results = input.required<Product[]>();
  activeIndex = input(-1);
  selected = output<Product>();
}
