import { Component, output, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from '../../../features/auth/services/auth-api.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  menuToggled = output<void>();

  private auth = inject(AuthApiService);
  private router = inject(Router);

  dropdownOpen = signal(false);

  toggleMenu() {
    this.menuToggled.emit();
  }

  toggleDropdown() {
    this.dropdownOpen.update(v => !v);
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
