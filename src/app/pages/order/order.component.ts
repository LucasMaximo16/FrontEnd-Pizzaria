import { Component, OnInit } from "@angular/core";
import { Socket, io } from "socket.io-client";
import { ItemCarrinhoDTO } from "src/app/DTO/itensCarrinho.dto";
import { PedidoServiceService } from "src/app/service/PedidoService/pedido-service.service";
import { ApiService } from "src/app/service/api.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  panelOpenState = false;
  orders: any[] = [];
  pedidos : any[] = [];
  currentOrder: { [key: string]: ItemCarrinhoDTO[] } = {};
  socket?: Socket;

  mesasComPedidos = this.orders.map(order => ({
    mesa: order.table,
    pedidos: []
  }));

  constructor(
    private pedidoSerivice: PedidoServiceService,
    private api: ApiService
  ) { }

  ngOnInit(): void {
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

    this.socket.on('recived', message => {
      console.log(message);
    });

    this.socket.on('Pedido-Enviado', mensagem => {
      const pedido = JSON.parse(mensagem);
      console.log(pedido);
      this.orders = [...this.orders, pedido];
    });

    this.api.getMesas().subscribe(response => {
      console.log(response);
      this.orders = response;
    });
  }

  getItensPedido(orderId: string) {
    console.log(orderId);
    this.pedidoSerivice.getPedidosMesa(orderId).subscribe(response => {
      console.log(response);
      const pedido = Object.values(response);
      console.log(pedido, "aquii");
      const mesa = this.orders.find(m => m.id === orderId);
      if (mesa) {
        mesa.itens = pedido;
      }
    });
  }
}
