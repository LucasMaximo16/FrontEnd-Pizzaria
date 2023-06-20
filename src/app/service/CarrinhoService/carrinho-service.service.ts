import { ItemCarrinhoDTO } from './../../DTO/itensCarrinho.dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ProductDTO } from 'src/app/DTO/Product.dto';
import { AuthService } from 'src/app/auth/auth.service';

export interface Product {
  id: string
  name: string
  price: string
  description: string
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoServiceService {

  private apiUrl = "https://projeto-bela-pizza-backend.onrender.com/";
  // private apiUrl = "http://localhost:3333/";
  constructor(private http: HttpClient,
    private authService : AuthService) { }

  private itensCarrinho2 = new BehaviorSubject<Product[]>([]);
  private itensCarrinho = new BehaviorSubject<Product[]>([]);
  carrinho$ = this.itensCarrinho.asObservable();

  getItensCarrinho(idOrder: string): Observable<ItemCarrinhoDTO[]> {
    console.log(this.itensCarrinho.value);
    console.log(idOrder);
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ItemCarrinhoDTO[]>(this.apiUrl + "order/detail/" + idOrder, { headers: headers })
    // return this.itensCarrinho.value;
  }

  adicionarItem(item: Product) {
    const itensAtuais = this.itensCarrinho.value;
    this.itensCarrinho.next([...itensAtuais, item]);
  }

  ItemCarrinho(item: ProductDTO) : Observable<ProductDTO>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<ProductDTO>(this.apiUrl + "order/add", item, {headers:headers})
  }

  adicionarProduto(produto: ProductDTO): Observable<ProductDTO> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<ProductDTO>(this.apiUrl + `order/add`, produto, { headers: headers });
  }

  enviarPedido(idOrder : string){
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(this.apiUrl + "order/", { id: idOrder }, { headers: headers })
  }

  deleteItem(item: ItemCarrinhoDTO){
    console.log(item.id, "Ola idItem");
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.apiUrl + "order/remove",{id:item.id,order_id:item.order_id},{headers:headers})
  }

  limparCarrinho() {
    this.itensCarrinho.next([]);
  }
}
