import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { OrderComponent } from './pages/order/order.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from '../app/app-routing/app-routing.module';
import {MatIconModule} from '@angular/material/icon'
import { DialogModule } from 'primeng/dialog';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';
import { MesaComponent } from './pages/mesa/mesa.component';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { ModalFinalizarPedidoComponent } from './components/modal/modalFinalizarPedido/modal-finalizar-pedido/modal-finalizar-pedido.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    OrderComponent,
    HeaderComponent,
    HomeComponent,
    CarrinhoComponent,
    MesaComponent,
    OrderDetailComponent,
    LoginComponent,
    ModalFinalizarPedidoComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ButtonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastModule,
    MatDialogModule,
    MessagesModule,
    MatExpansionModule,
    MatIconModule,
    DialogModule,
    BrowserAnimationsModule,
  ],
  exports: [
    LoginComponent,
  ],
  providers: [CookieService, LoginComponent, OrderDetailComponent, MessagesModule, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
