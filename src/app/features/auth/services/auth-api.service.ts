import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface LoginRequest {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<void> {
    const body: LoginRequest = { email, password };
    return this.http.post<void>(`${environment.baseUrlBack}/auth/login`, body, {
      withCredentials: true,
    });
  }

  loginWithGoogle(): void {
    // TODO: wire up real Google OAuth provider
    console.log('loginWithGoogle');
  }
}
