import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  login(email: string, password: string, rememberMe: boolean): Observable<void> {
    // TODO: replace with real API call, e.g.:
    // return this.http.post<void>('/api/auth/login', { email, password, rememberMe });
    console.log('login', { email, password, rememberMe });
    return of(undefined);
  }

  loginWithGoogle(): void {
    // TODO: wire up real Google OAuth provider
    console.log('loginWithGoogle');
  }
}
