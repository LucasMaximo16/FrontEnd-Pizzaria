import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderTable } from '../DTO/OrderTable.dto';
import { LoginDTO } from '../DTO/login.dto';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = "https://projeto-bela-pizza-backend.onrender.com/";

  constructor(private http: HttpClient, private authService: AuthService) { }

  getOrders() {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.apiUrl, { headers: headers });
  }

  getAllProducts(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.apiUrl + "product/", { headers: headers });
  }

  getMesas(): Observable<any[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(this.apiUrl + "order/all", {headers:headers});
  }

  abrirMesa(table: OrderTable): Observable<OrderTable> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(table);
    return this.http.post<OrderTable>(this.apiUrl + "order", table, { headers: headers });
  }

  fecharMesa(idOrder: string) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(idOrder);
    return this.http.put(this.apiUrl + "order/finish/", idOrder, { headers: headers });
  }

  login(login: LoginDTO): Observable<LoginDTO> {
    return this.http.post<LoginDTO>(this.apiUrl + "user/login", login);
  }
}
