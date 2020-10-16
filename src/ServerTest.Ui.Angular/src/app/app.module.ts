import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
import { DxTextAreaModule } from 'devextreme-angular/ui/text-area';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DxDataGridModule, DxTabPanelModule, DxValidationSummaryModule } from 'devextreme-angular';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ClientService } from './services/client.service';
import { ClientTypeService } from './services/clienttype.service';
import { AppRoutingModule } from './app-routing.module';

export function TranslationLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientJsonpModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {provide: TranslateLoader, useFactory: TranslationLoaderFactory, deps: [HttpClient]}
    }),
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    DxButtonModule,
    DxTextAreaModule,
    DxTextBoxModule,
    DxDateBoxModule,
    DxFormModule,
    DxValidationSummaryModule,
    DxDataGridModule,
    DxTabPanelModule
  ],
  providers: [
    ClientService, 
    ClientTypeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
