import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientformdxComponent } from './clientformdx.component';

const routes: Routes = [{ path: '', component: ClientformdxComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientformdxRoutingModule { }
