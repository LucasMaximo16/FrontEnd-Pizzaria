import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ItemCarrinhoDTO } from 'src/app/DTO/itensCarrinho.dto';
import { AuthService } from 'src/app/auth/auth.service';

export interface Pedido{
  mesa : number,
  nomeProduto: string,
  descricao: string
}

@Injectable({
  providedIn: 'root'
})
export class PedidoServiceService {
  private apiUrl = "https://projeto-bela-pizza-backend.onrender.com/";
  // private apiUrl = "http://localhost:3333/";
  private pedidosPendentes: ItemCarrinhoDTO[] = [];
  private pedidosPendentesSubject = new BehaviorSubject<ItemCarrinhoDTO[]>([]);

  constructor(private http: HttpClient,
              private authService : AuthService) { }

  adicionarPedido(pedido: ItemCarrinhoDTO) {
    this.pedidosPendentes.push(pedido);
    this.pedidosPendentesSubject.next(this.pedidosPendentes);
  }

  getPedidosPendentes() {
    return this.pedidosPendentesSubject.asObservable();
  }

  getPedidosMesa(idOrder  : string) : Observable<ItemCarrinhoDTO>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ItemCarrinhoDTO>(this.apiUrl + "order/detail/" + idOrder, {headers:headers})
  }
}
