import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductDTO } from 'src/app/DTO/Product.dto';
import { CarrinhoServiceService } from 'src/app/service/CarrinhoService/carrinho-service.service';
import { ApiService } from 'src/app/service/api.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

interface Product {
  id:string
  name: string;
  banner?: string;
  description: string;
  price: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Output() itemSelected: EventEmitter<boolean> = new EventEmitter<boolean>();
  showButton: boolean = false;

  products: Product[] = [];
  orderId : string = ""
  produtoSelecionado: Product | undefined

  // itensCarrinho = new BehaviorSubject<Product[]>([]);
  carrinho$?: Observable<Product[]> = this.carrinhoService.carrinho$;


  constructor(private api: ApiService,
              private carrinhoService: CarrinhoServiceService,
              private route: ActivatedRoute,
              private router: Router,
              private messageService: MessageService,
              private confirmationService: ConfirmationService
              ) { }

  ngOnInit() {
    this.api.getAllProducts().subscribe(response => {
      console.log(response.data);
      this.products = response.data;
    });

    this.route.url.subscribe(segments => {
      const mesaIdSegment = segments[segments.length - 1];
      this.orderId = mesaIdSegment.path;
      console.log('Id da mesa:', this.orderId);
    });
  }
  adicionarAoCarrinho(produto:Product){
    const productAdicionado = {
      order_id: this.orderId,
      product_id: produto.id,
      amount: 1
    }
    console.log(productAdicionado);

    this.carrinhoService.adicionarProduto(productAdicionado).subscribe(
      (response:ProductDTO) => {
        console.log('Produto adicionado ao carrinho com sucesso!', response);
        this.carrinhoService.adicionarItem(produto)
      },
      (error : Error) => {
        console.error('Erro ao adicionar o produto ao carrinho', error);
      }
    );
  }
  deletarMesa(){
    this.api.fecharMesa(this.orderId).subscribe(response => {
      console.log("id AQUII",this.orderId);
      console.log("response", response);
      if(response.id == this.orderId){
        this.messageService.add({ severity: 'success', summary: 'Success:', detail: 'Pedido Deletado' });
        this.router.navigate(['/'])
      }
      else{
        this.messageService.add({ severity: 'error', summary: 'Erro:', detail: 'Erro ao cadastrar a categoria' });
      }
    })
  }

  adicionarItem(item: Product) {
    console.log(item);
    this.carrinhoService.adicionarItem(item);
  }

  finalizarCompra() {
    const queryParams = { orderId: this.orderId };
    this.router.navigate(['/carrinho'], { queryParams: { orderId: this.orderId } });
  }

  selecionarItem() {
    this.itemSelected.emit(true);
  }
  confirm1() {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja Deletar a mesa ?',
      header: 'DELETAR MESA',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deletarMesa();
        this.messageService.add({ severity: 'Success', summary: 'Deletado', detail: 'Mesa Deletada com sucesso' });
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            // this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      }
    });
  }
}
