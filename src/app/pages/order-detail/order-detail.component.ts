import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemCarrinhoDTO } from 'src/app/DTO/itensCarrinho.dto';
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
  constructor(private route: ActivatedRoute,
              private carrinhoService : CarrinhoServiceService,
              private router : Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.OrderId = params.get('idOrder') || "";
      this.buscarPedidosMesa(this.OrderId);
    });
  }

  buscarPedidosMesa(idOrder : string){
    idOrder = this.OrderId
    this.carrinhoService.getItensCarrinho(idOrder).subscribe(response => {
      console.log(response);
      this.itensCarrinho = response
    })
  }

  adicionarItemPedido(){
    this.router.navigate(["produtos", this.OrderId])
  }
}
