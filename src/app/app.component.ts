import { Component } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pizzaria-project';

  showButton = false;

  constructor() { }

  ngOnInit() {
  }

  onItemSelected(event: boolean) {
    this.showButton = event;
  }


}
