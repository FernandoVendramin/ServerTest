import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientlistComponent } from './clientlist.component';

const routes: Routes = [{ path: '', component: ClientlistComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientlistRoutingModule { }
