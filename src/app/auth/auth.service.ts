import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private cookieService: CookieService) { }

  isLoggedIn(): boolean {
    const token = this.cookieService.get('authToken');
    // verifique se o token existe e se não está expirado
    return token !== '' && this.isTokenValid(token);
  }

  isTokenValid(token: string): boolean {
    if (!token) {
      return false;
    }

    const jwtHelper = new JwtHelperService();
    const tokenExpired = jwtHelper.isTokenExpired(token);

    return !tokenExpired;
  }

  public getToken(): string {
    return this.cookieService.get('authToken');
  }

  public setToken(token: string): void {
    this.cookieService.set('authToken', token);
  }

  public deleteToken(): void {
    this.cookieService.delete('authToken');
  }
}
