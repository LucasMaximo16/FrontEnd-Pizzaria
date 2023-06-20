import { Component, OnInit } from '@angular/core';
import { CreateProductDTO } from 'src/app/DTO/CreateProductDTO.dto';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  Categorylist: any; // Correção: alterado de 'any' para 'any[]'
  description: string = '';
  price: string = '';
  option: string = '';
  name: string = '';

  arquivoSelecionado: File | null = null;
  imagemSelecionadaUrl: string | null = null;

  objetoParaSalvar: CreateProductDTO = {
    name: '',
    price: '',
    description: '',
    banner: '',
    category_id: ''
  };

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.listarCategorias();
  }

  onSubmit(): void {
    this.objetoParaSalvar.name = this.name;
    this.objetoParaSalvar.price = this.price;
    this.objetoParaSalvar.description = this.description;
    this.objetoParaSalvar.category_id = this.option;

    console.log(this.objetoParaSalvar);

    this.api.createProduct(this.objetoParaSalvar).subscribe(response => {
      console.log(response);
    });
  }

  onFileSelected(event: any): void {
    this.arquivoSelecionado = event.target.files[0];
    this.readFileAsBase64();
  }

  readFileAsBase64(): void {
    if (this.arquivoSelecionado) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.objetoParaSalvar.banner = e.target.result;
        this.imagemSelecionadaUrl = e.target.result;
      };
      reader.readAsDataURL(this.arquivoSelecionado);
    }
  }

  listarCategorias(): void {
    this.api.getCategory().subscribe(response => {
      console.log(response);
      this.Categorylist = response;
    });
  }
}
