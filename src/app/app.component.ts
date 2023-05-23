import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { LoginComponent } from './pages/login/login.component';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  paginaAtual: string = '';
  showHeader = true;
  @Input() mostrarMenu: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private login: AuthService,) { }

  ngOnInit(): void {
    this.login.isLogin.subscribe(mostrar => {
      console.log("entrei");
      console.log(mostrar);
      this.mostrarMenu = mostrar
    })
  }
}
