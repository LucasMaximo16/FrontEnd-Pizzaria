import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/pages/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  paginaAtual: string = ''
  mostrarMenu = false;

  constructor(private auth: AuthService,
              private login : LoginComponent,
              private router: Router) { }

  ngOnInit(): void {
    console.log("olaaaaa");
    this.login.mostrarEventoEmiter.subscribe(mostrar => {
      console.log("entrei");
      console.log(mostrar);
      this.mostrarMenu = mostrar
    })
  }

  logout(){
    console.log('chamando');
    this.auth.deleteToken()
    this.router.navigate(["/login"])
  }
}
