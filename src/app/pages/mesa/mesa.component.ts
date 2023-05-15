import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderTable } from 'src/app/DTO/OrderTable.dto';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.scss']
})
export class MesaComponent implements OnInit {

  mesas : any[] = []
  novaMesa: OrderTable = {id : '', table: 0, name: ''};

  constructor( private api: ApiService,
               private router: Router) { }

  ngOnInit(): void {
    this.getMesas()
  }

  getMesas(){
    this.api.getMesas().subscribe(mesas => {
      console.log(mesas);
      this.mesas = mesas
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
}
