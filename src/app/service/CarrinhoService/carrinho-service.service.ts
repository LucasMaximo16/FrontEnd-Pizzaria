import { ItemCarrinhoDTO } from './../../DTO/itensCarrinho.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ProductDTO } from 'src/app/DTO/Product.dto';

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

  private apiUrl = 'http://localhost:3333/';
  constructor(private http: HttpClient) { }

  private itensCarrinho2 = new BehaviorSubject<Product[]>([]);
  private itensCarrinho = new BehaviorSubject<Product[]>([]);
  carrinho$ = this.itensCarrinho.asObservable();

  getItensCarrinho(idOrder: string): Observable<ItemCarrinhoDTO[]> {
    console.log(this.itensCarrinho.value);
    console.log(idOrder);
    return this.http.get<ItemCarrinhoDTO[]>(this.apiUrl + "order/detail/" + idOrder)
    // return this.itensCarrinho.value;
  }

  adicionarItem(item: Product) {
    const itensAtuais = this.itensCarrinho.value;
    this.itensCarrinho.next([...itensAtuais, item]);
  }

  ItemCarrinho(item: ProductDTO) : Observable<ProductDTO>{
    return this.http.post<ProductDTO>(this.apiUrl + "order/add", item)
  }

  adicionarProduto(produto: ProductDTO): Observable<ProductDTO> {
    return this.http.post<ProductDTO>(this.apiUrl + `order/add`, produto);
  }

  enviarPedido(idOrder : string){
    return this.http.put(this.apiUrl + "order/", { id : idOrder})
  }

  limparCarrinho() {
    this.itensCarrinho.next([]);
  }
}
