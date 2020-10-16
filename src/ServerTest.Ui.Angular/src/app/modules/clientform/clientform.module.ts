import { NgModule } from '@angular/core';

import { ClientformRoutingModule } from './clientform-routing.module';
import { ClientFormComponent } from './clientform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [ClientFormComponent],
  imports: [
    CommonModule,
    ClientformRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ]
})
export class ClientformModule { }
