import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFinalizarPedidoComponent } from './modal-finalizar-pedido.component';

describe('ModalFinalizarPedidoComponent', () => {
  let component: ModalFinalizarPedidoComponent;
  let fixture: ComponentFixture<ModalFinalizarPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFinalizarPedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFinalizarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
