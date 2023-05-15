import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ItemCarrinhoDTO } from 'src/app/DTO/itensCarrinho.dto';

export interface Pedido{
  mesa : number,
  nomeProduto: string,
  descricao: string
}

@Injectable({
  providedIn: 'root'
})
export class PedidoServiceService {
  private apiUrl: string = 'http://localhost:3333/'
  private pedidosPendentes: ItemCarrinhoDTO[] = [];
  private pedidosPendentesSubject = new BehaviorSubject<ItemCarrinhoDTO[]>([]);

  constructor(private http: HttpClient) { }

  adicionarPedido(pedido: ItemCarrinhoDTO) {
    this.pedidosPendentes.push(pedido);
    this.pedidosPendentesSubject.next(this.pedidosPendentes);
  }

  getPedidosPendentes() {
    return this.pedidosPendentesSubject.asObservable();
  }

  getPedidosMesa(idOrder  : string) : Observable<ItemCarrinhoDTO>{
    return this.http.get<ItemCarrinhoDTO>(this.apiUrl + "order/detail/" + idOrder)
  }
}
