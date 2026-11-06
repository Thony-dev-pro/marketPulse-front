import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface UpdateEmailRequest {
  email: string;
}

export interface StoredUser {
  id: number;
  email: string;
  status: number;
}

@Injectable({ providedIn: 'root' })
export class UserApiService {
  constructor(private http: HttpClient) {}

  updateLocalStorageUser(partial: Partial<StoredUser>): void {
    const raw = localStorage.getItem('user');
    if (!raw) return;
    const user: StoredUser = JSON.parse(raw);
    localStorage.setItem('user', JSON.stringify({ ...user, ...partial }));
  }

  updateEmail(email: string): Observable<void> {
    const body: UpdateEmailRequest = { email };
    return this.http.patch<void>(`${environment.baseUrlBack}/users/email`, body, {
      withCredentials: true,
    }).pipe(tap(() => this.updateLocalStorageUser({ email })));
  }
}
