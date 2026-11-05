import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `<h1 class="page-title">Dashboard</h1><div class="page-blank"></div>`,
  styles: [`
    .page-title { font-size: 24px; font-weight: 600; color: var(--color-text); margin: 0 0 16px; }
    .page-blank { background: #fff; border-radius: var(--radius); border: 1px solid var(--color-border); min-height: 400px; }
  `],
})
export class DashboardComponent {}
