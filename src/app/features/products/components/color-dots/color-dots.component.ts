import { Component, input } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-color-dots',
  standalone: true,
  template: `
    @if (options().type === 'colors') {
      <span class="dots">
        @for (c of $any(options()).values; track c) {
          <span class="dot" [style.background]="c" [title]="c"></span>
        }
      </span>
    } @else {
      <span class="text-option">{{ $any(options()).value }}</span>
    }
  `,
  styles: [`
    .dots { display: inline-flex; gap: 4px; align-items: center; }
    .dot { width: 14px; height: 14px; border-radius: 50%; border: 1px solid rgba(0,0,0,0.1); }
    .text-option { font-size: 13px; color: var(--color-text-muted); }
  `],
})
export class ColorDotsComponent {
  options = input.required<Product['options']>();
}
