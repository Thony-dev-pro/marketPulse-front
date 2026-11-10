import { Component, output, inject, OnDestroy, ElementRef } from '@angular/core';

@Component({
  selector: 'app-product-toolbar',
  standalone: true,
  imports: [],
  templateUrl: './product-toolbar.component.html',
  styleUrl: './product-toolbar.component.css',
})
export class ProductToolbarComponent implements OnDestroy {
  searchValue = output<string>();

  private el = inject(ElementRef);

  private debounceTimer: ReturnType<typeof setTimeout> | null = null;
  private outsideClickHandler = (e: MouseEvent) => {
    if (!this.el.nativeElement.contains(e.target)) {
      // dropdownOpen logic removed
    }
  };

  constructor() {
    document.addEventListener('click', this.outsideClickHandler);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.outsideClickHandler);
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
  }

  onSearchInput(value: string) {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.searchValue.emit(value);
    }, 200);
  }
}
