import { LoginDTO} from './../../DTO/login.dto';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginDTO: LoginDTO = { email: '', password: '', token:'' };
  constructor(private authService: AuthService,
              private api : ApiService,
              private router : Router) {}

  ngOnInit(): void {
  }

  login(){
    console.log(this.loginDTO);
    this.api.login(this.loginDTO).subscribe((response : LoginDTO )  => {
      console.log(response);
      this.authService.setToken(response.token)
      this.router.navigate(["/"])
    })
  }

  logout(){
    this.authService.deleteToken()
  }
}
