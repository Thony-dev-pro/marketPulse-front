import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  standalone: true,
  template: `
    <span class="stars" [attr.aria-label]="rating() + ' out of 5 stars'">
      @for (s of stars(); track $index) {
        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
          @if (s === 'full') {
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="#f59e0b" stroke="#f59e0b" stroke-width="1"/>
          } @else if (s === 'half') {
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="url(#half)" stroke="#f59e0b" stroke-width="1"/>
            <defs><linearGradient id="half"><stop offset="50%" stop-color="#f59e0b"/><stop offset="50%" stop-color="#e5e7eb"/></linearGradient></defs>
          } @else {
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="#e5e7eb" stroke="#e5e7eb" stroke-width="1"/>
          }
        </svg>
      }
    </span>
  `,
  styles: [`.stars { display: inline-flex; gap: 1px; align-items: center; }`],
})
export class RatingStarsComponent {
  rating = input.required<number>();

  stars = computed(() => {
    const r = this.rating();
    return Array.from({ length: 5 }, (_, i) => {
      if (r >= i + 1) return 'full';
      if (r >= i + 0.5) return 'half';
      return 'empty';
    });
  });
}
