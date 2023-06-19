import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { FooterComponent } from '../components/footer/footer.component';
import { CarrinhoComponent } from '../pages/carrinho/carrinho.component';
import { MesaComponent } from '../pages/mesa/mesa.component';
import { OrderComponent } from '../pages/order/order.component';
import { OrderDetailComponent } from '../pages/order-detail/order-detail.component';
import { LoginComponent } from '../pages/login/login.component';
import { AuthGuard } from '../auth/authGuard/auth-guard.service';
import { ProductComponent } from '../pages/product/product.component';
import { CategoriaComponent } from '../pages/categoria/categoria.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },

  { path: '', component: MesaComponent, canActivate: [AuthGuard] },

  { path: 'produtos/:idMesa', component: HomeComponent, canActivate: [AuthGuard] },

  { path: 'order/:idOrder/pedidos', component: OrderDetailComponent, canActivate: [AuthGuard] },

  { path: 'carrinho', component: CarrinhoComponent, canActivate: [AuthGuard] },

  { path: 'pedidos', component: OrderComponent, canActivate: [AuthGuard] },

  { path: 'produto', component: ProductComponent, canActivate: [AuthGuard] },

  { path: 'categoria', component: CategoriaComponent, canActivate: [AuthGuard] }

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
