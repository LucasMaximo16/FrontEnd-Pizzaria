import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderTable } from '../DTO/OrderTable.dto';
import {LoginDTO} from '../DTO/login.dto'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3333/';

  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get(this.apiUrl)
  }

  getAllProducts(): Observable<any> {
    return this.http.get(this.apiUrl + "product/");
  }

  getMesas() : Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl + "order/all")
  }

  abrirMesa(table : OrderTable) : Observable<OrderTable>{
    console.log(table);
    return this.http.post<OrderTable>(this.apiUrl + "order", table )
  }

  login(login:LoginDTO): Observable<LoginDTO>{
    return this.http.post<LoginDTO>(this.apiUrl + "user/login", login )
  }
}
