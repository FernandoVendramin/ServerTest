import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client-app';
  
  constructor(public translateService: TranslateService) {
    translateService.addLangs(['pt', 'en']);
    translateService.setDefaultLang('pt');
  }

  ngOnInit(): void { }

  switchLang(lang: string) {
    this.translateService.use(lang);
  }

}