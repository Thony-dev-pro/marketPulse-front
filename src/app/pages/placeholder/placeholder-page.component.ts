import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-placeholder-page',
  standalone: true,
  template: `
    <h1 class="page-title">{{ title() }}</h1>
    <div class="page-blank"></div>
  `,
  styles: [`
    .page-title { font-size: 24px; font-weight: 600; color: var(--color-text); margin: 0 0 16px; text-transform: capitalize; }
    .page-blank { background: #fff; border-radius: var(--radius); border: 1px solid var(--color-border); min-height: 400px; }
  `],
})
export class PlaceholderPageComponent {
  private route = inject(ActivatedRoute);
  title = toSignal(this.route.data.pipe(map(d => d['title'] ?? '')), { initialValue: '' });
}
