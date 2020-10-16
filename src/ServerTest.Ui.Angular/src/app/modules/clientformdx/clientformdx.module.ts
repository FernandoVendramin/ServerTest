import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
import { DxTextAreaModule } from 'devextreme-angular/ui/text-area';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DxDataGridModule, DxTabPanelModule, DxValidationSummaryModule } from 'devextreme-angular';
import { ToastrModule } from 'ngx-toastr';
import { ClientformdxRoutingModule } from './clientformdx-routing.module';
import { ClientformdxComponent } from './clientformdx.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ClientformdxComponent],
  imports: [
    CommonModule,
    ClientformdxRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ToastrModule.forRoot(), // ToastrModule added
    DxButtonModule,
    DxTextAreaModule,
    DxTextBoxModule,
    DxDateBoxModule,
    DxFormModule,
    DxValidationSummaryModule,
    DxDataGridModule,
    DxTabPanelModule
  ]
})
export class ClientformdxModule { }
