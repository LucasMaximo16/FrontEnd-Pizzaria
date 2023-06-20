import { EventEmitter, Injectable, Output, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{
  @Output() isLogin = new EventEmitter<boolean>(false);


  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
    // this.isLogin.emit(false)
  }

  isLoggedIn(): boolean {
    const token = this.cookieService.get('authToken');
    // verifique se o token existe e se não está expirado
    return token !== '' && this.isTokenValid(token);
  }

  isTokenValid(token: string): boolean {
    if (!token) {
      this.isLogin.emit(false)
      return false;
    }

    const jwtHelper = new JwtHelperService();
    const tokenExpired = jwtHelper.isTokenExpired(token);

    return !tokenExpired;
  }

  public getToken(): string {
    if(this.cookieService.get('authToken')){
      this.isLogin.emit(true)
    }
    else{
      this.isLogin.emit(false)
    }
    return this.cookieService.get('authToken');
  }

  public setToken(token: string): void {
    this.cookieService.set('authToken', token);
    this.isLogin.emit(true)
  }

  public deleteToken(): void {
    this.isLogin.emit(false)
    this.cookieService.delete('authToken');
  }
}
