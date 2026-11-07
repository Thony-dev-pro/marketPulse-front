import { Component, input, output } from '@angular/core';
import { Product } from '../../models/product.model';
import { RatingStarsComponent } from '../rating-stars/rating-stars.component';
import { ColorDotsComponent } from '../color-dots/color-dots.component';

@Component({
  selector: 'app-product-row',
  standalone: true,
  imports: [RatingStarsComponent, ColorDotsComponent],
  templateUrl: './product-row.component.html',
  styleUrl: './product-row.component.css',
})
export class ProductRowComponent {
  product = input.required<Product>();
  selected = input(false);
  selectionChanged = output<boolean>();
  editClicked = output<Product>();
  menuClicked = output<Product>();
}
