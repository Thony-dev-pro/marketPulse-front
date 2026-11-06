import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: number;
    email: string;
    status: number;
  };
}

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private loggedIn = signal(false);

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    return this.loggedIn();
  }

  login(email: string, password: string): Observable<LoginResponse> {
    const body: LoginRequest = { email, password };
    return this.http.post<LoginResponse>(`${environment.baseUrlBack}/auth/login`, body, {
      withCredentials: true,
    }).pipe(tap((res) => {
      localStorage.setItem('user', JSON.stringify(res.user));
      this.loggedIn.set(true);
    }));
  }

  logout(): void {
    this.loggedIn.set(false);
  }

  loginWithGoogle(): void {
    // TODO: wire up real Google OAuth provider
    console.log('loginWithGoogle');
  }
}
