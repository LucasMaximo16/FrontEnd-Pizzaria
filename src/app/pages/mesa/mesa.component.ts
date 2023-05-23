import { ModalFinalizarPedidoComponent } from './../../components/modal/modalFinalizarPedido/modal-finalizar-pedido/modal-finalizar-pedido.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrderTable } from 'src/app/DTO/OrderTable.dto';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/service/api.service';
import { MesaDTO } from 'src/app/DTO/mesa.dto';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { ItemCarrinhoDTO } from 'src/app/DTO/itensCarrinho.dto';
import { CarrinhoServiceService } from 'src/app/service/CarrinhoService/carrinho-service.service';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.scss']
})
export class MesaComponent implements OnInit {

  messages: any[] = [];
  mesas : MesaDTO[] = []
  novaMesa: OrderTable = {id : '', table: 0, name: ''};
  itensCarrinho: ItemCarrinhoDTO[] = [];
  valorTotal = 0;



  constructor( private api: ApiService,
               private router: Router,
               public dialog: MatDialog,
               private order: OrderDetailComponent,
               private carrinhoService: CarrinhoServiceService,
) { }

  ngOnInit(): void {
    this.getMesas()
  }

  getMesas(){
    this.api.getMesas().subscribe(mesas => {
      console.log(mesas, "aquiii");
     return this.mesas = mesas
    })
  }

  abrirMesa(){
    console.log(this.novaMesa);
    this.api.abrirMesa(this.novaMesa).subscribe(response => {
      this.router.navigate(['/produtos', response.id])
    })
    console.log(this.novaMesa);
  }

  detalhesPedido(idOrder : string){
    this.router.navigate(["order", idOrder, "pedidos"])
  }

  visible: boolean = false;

  showDialog(orderId : string)  {
    console.log(orderId);
    this.visible = true;
    this.carrinhoService.getItensCarrinho(orderId).subscribe(response => {
      console.log(response, "aqquiii");
      this.itensCarrinho = response

      this.valorTotal = this.calcularValorTotal(this.itensCarrinho);
      console.log(this.valorTotal);
    })
  }

  calcularValorTotal(itensCarrinho: ItemCarrinhoDTO[]): number {
    let valorTotal = 0;
    for (const item of itensCarrinho) {
      const valorItem = parseFloat(item.product.price) * item.amount;
      valorTotal += valorItem;
    }
    return valorTotal;
  }

  fecharConta(orderId : string){
    this.api.fecharMesa(orderId).subscribe(result => {
      console.log(result);
    })
  }
}
