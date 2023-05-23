import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-finalizar-pedido',
  templateUrl: './modal-finalizar-pedido.component.html',
  styleUrls: ['./modal-finalizar-pedido.component.scss']
})
export class ModalFinalizarPedidoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalFinalizarPedidoComponent>) { }

  ngOnInit(): void {
  }

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

}
