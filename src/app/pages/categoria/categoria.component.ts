import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {

  categoria : string =  ""

  constructor(private api : ApiService,
              private messageService: MessageService) { }

  ngOnInit(): void {
  }

  insertCategoria(name:string){
    this.api.createCategory(name).subscribe(result => {
      if(result){
        this.messageService.add({ severity: 'success', summary: 'Success:', detail: 'Categoria cadastrada com sucesso' });
      }else{
        this.messageService.add({ severity: 'error', summary: 'Erro:', detail: 'Erro ao cadastrar a categorian' });
      }
      console.log(result);
    })
  }

}
