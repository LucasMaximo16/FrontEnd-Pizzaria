import { ItemCarrinhoDTO } from './../../DTO/itensCarrinho.dto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Socket, io } from 'socket.io-client';
import { CarrinhoServiceService } from 'src/app/service/CarrinhoService/carrinho-service.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  OrderId : string = ""
  itensCarrinho: ItemCarrinhoDTO[] = [];
  OrderItens : ItemCarrinhoDTO[] =[]
  socket?: Socket;

  constructor(private route: ActivatedRoute,
              private carrinhoService : CarrinhoServiceService,
              private router : Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.OrderId = params.get('idOrder') || "";
      this.buscarPedidosMesa(this.OrderId);
    });

    this.socket = io("https://projeto-bela-pizza-backend.onrender.com/");
    if (this.socket) {
      this.socket.on('connect', () => {
        console.log(this.socket);
        console.log('Conexão com WebSocket estabelecida');
      });
    }

    this.socket.on('connect', () => {
      console.log('Conexão estabelecida com sucesso!');
    });

    this.socket.on('disconnect', () => {
      console.log('Conexão perdida!');
    });
  }

  buscarPedidosMesa(idOrder : string){
    this.carrinhoService.getItensCarrinho(idOrder).subscribe(response => {
      console.log(response);
      this.itensCarrinho = response
    })
  }

  deleteItem(item: ItemCarrinhoDTO) {
    console.log(item.id, "Id Item");
    this.carrinhoService.deleteItem(item).subscribe(response => {
      console.log(response);
      this.itensCarrinho = this.itensCarrinho.filter(orderItem => orderItem.id !== item.id);
    });
  }

  adicionarItemPedido(){
    this.router.navigate(["produtos", this.OrderId])
  }
}
