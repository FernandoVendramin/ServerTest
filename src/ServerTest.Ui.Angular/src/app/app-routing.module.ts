import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientFormDevexpressComponent } from './pages/client/client-form-devexpress/client-form-devexpress.component';
import { ClientFormComponent } from './pages/client/client-form/client-form.component';
import { ClientListComponent } from './pages/client/client-list/client-list.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  { path: 'clientform', component: ClientFormComponent },
  { path: 'clientformdx', component: ClientFormDevexpressComponent },
  { path: 'clientlist', component: ClientListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
