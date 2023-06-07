import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import { ItemCarrinhoDTO } from 'src/app/DTO/itensCarrinho.dto';
import { CarrinhoServiceService, Product } from 'src/app/service/CarrinhoService/carrinho-service.service';
import { PedidoServiceService } from 'src/app/service/PedidoService/pedido-service.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss']
})
export class CarrinhoComponent implements OnInit {

  itensCarrinho: ItemCarrinhoDTO[] = [];
  orderId: string = ''
  socket?: Socket;

  constructor(private carrinhoService : CarrinhoServiceService,
              private route: ActivatedRoute,
              private router : Router,
              private predidoService : PedidoServiceService) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.orderId = params.get('orderId') || '';
      this.getItensCarrinho(this.orderId);
    });
    this.socket = io("https://projeto-bela-pizza-backend.onrender.com");
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

    this.socket.on('message', (mensagem: string) => {
      console.log(`Mensagem recebida: ${mensagem}`);
    });

    this.socket.emit('message', 'Olá, servidor!');
  }

  getItensCarrinho(orderId : string){
    orderId = this.orderId
    this.carrinhoService.getItensCarrinho(orderId).subscribe(response => {
      console.log(response);
      this.itensCarrinho = response
    }),
    (error: Error) => {
        console.error('Erro ao adicionar o produto ao carrinho', error);
    }
  }

  enviarPedido(orderId: string) {
    const observer = {
      next: (response: any) => {
        console.log("+++++++++++++++++++++");
        console.log(response);
        console.log("+++++++++++++++++++++");

        this.socket?.emit('novo-pedido', response);
        this.router.navigate(['/']);
      },
      error: (error: Error) => {
        console.error('Erro ao adicionar o produto ao carrinho', error);
      }
    };

    this.carrinhoService.enviarPedido(orderId).subscribe(observer);
  }
}
