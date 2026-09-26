import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { API_URL } from './api-config';

interface LoginResponse {
  token: string;
  expiresIn: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) { }

  get isAuthenticated(): boolean {
    return Boolean(sessionStorage.getItem('authToken'));
  }

  login(username: string, password: string) {
    return this.http.post<LoginResponse>(`${API_URL}/auth/login`, { username, password }).pipe(
      tap(response => sessionStorage.setItem('authToken', response.token))
    );
  }

  logout(): void {
    sessionStorage.removeItem('authToken');
  }
}
