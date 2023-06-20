import { LoginDTO} from './../../DTO/login.dto';
import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiService } from 'src/app/service/api.service';
import { EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() mostrarEventoEmiter = new EventEmitter<boolean>(false);

  loginDTO: LoginDTO = { email: '', password: '', token:'' };
  constructor(private authService: AuthService,
              private api : ApiService,
              private router : Router,
              private messageService: MessageService,) {}

  ngOnInit(): void {
  }

  login() {
    console.log(this.loginDTO);
    this.api.login(this.loginDTO).subscribe((response: LoginDTO) => {
      console.log(response);
      if (response) {
        this.authService.setToken(response.token);
        this.router.navigate(["/"]);
        const successMessage = { severity: 'success', summary: 'Usuário Autenticado', detail: 'Via MessageService' };
      } else {
        this.messageService.add({ severity: 'error', summary: 'Erro:', detail: 'Usuário ou senha incorretos' });
      }
    }, (error) => {
      this.messageService.add({ severity: 'error', summary: 'Erro:', detail: 'Ocorreu um erro durante o login' });
    });
  }

  logout(){
    this.authService.deleteToken()
  }
}
