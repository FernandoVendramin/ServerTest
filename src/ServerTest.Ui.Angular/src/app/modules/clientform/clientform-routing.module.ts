import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientFormComponent } from './clientform.component';

const routes: Routes = [{ path: '', component: ClientFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientformRoutingModule { }
