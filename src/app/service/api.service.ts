import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderTable } from '../DTO/OrderTable.dto';
import { LoginDTO } from '../DTO/login.dto';
import { AuthService } from '../auth/auth.service';
import { CreateProductDTO } from '../DTO/CreateProductDTO.dto';

interface ApiResponse {
  status:number
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = "https://projeto-bela-pizza-backend.onrender.com/";
  // private apiUrl = "http://localhost:3333/";

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

  fecharMesa(idOrder: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log("idOrder", idOrder);

    const body = { order_id: idOrder }; // Envolva o ID do pedido em um objeto

    return this.http.post(this.apiUrl + "order/finish/", body, { headers: headers });
  }

  createCategory(name:string){
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.apiUrl + 'category/', {name:name}, { headers: headers })
  }
  createProduct(obj:CreateProductDTO){
    const response = {
      name: obj.name,
      banner: obj.banner,
      description: obj.description,
      price: obj.price,
      category_id: obj.category_id
    }

    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.apiUrl + 'product/', response, { headers: headers })
  }

  getCategory(){
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.apiUrl + 'category/',{headers: headers})
  }


  login(login: LoginDTO): Observable<LoginDTO> {
    return this.http.post<LoginDTO>(this.apiUrl + "user/login", login);
  }
}
