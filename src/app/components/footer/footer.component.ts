import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CarrinhoServiceService } from 'src/app/service/CarrinhoService/carrinho-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {


  @Input() showButton: boolean = false;

  @Output() buttonClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  // carrinho$?: Observable<string[]> = this.carrinhoService.carrinho$;

  constructor(private carrinhoService: CarrinhoServiceService) { }

  ngOnInit(): void {

  }


  onButtonClicked() {
    this.buttonClicked.emit(true);
  }
}
