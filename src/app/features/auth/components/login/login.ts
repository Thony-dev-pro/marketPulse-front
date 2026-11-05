import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthApiService } from '../../services/auth-api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthApiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  loading = signal(false);
  showPassword = signal(false);
  errorMessage = signal('');

  get email() { return this.form.get('email')!; }
  get password() { return this.form.get('password')!; }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/admin/dashboard');
    }
  }

  togglePassword() {
    this.showPassword.update(v => !v);
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.errorMessage.set('');
    const { email, password } = this.form.value;
    this.authService.login(email!, password!).subscribe({
      next: (res) => {
        console.log('Login API call result:', res);
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/admin/dashboard';
        this.router.navigateByUrl(returnUrl);
      },
      error: (err) => {
        console.error('Login API call error:', err);
        this.errorMessage.set(err?.message ?? 'Login failed. Please try again.');
        this.loading.set(false);
      },
    });
  }
}
