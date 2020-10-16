import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  
  { path: 'clientform', loadChildren: () => import('./modules/clientform/clientform.module').then(m => m.ClientformModule) },
  { path: 'clientformdx', loadChildren: () => import('./modules/clientformdx/clientformdx.module').then(m => m.ClientformdxModule) },
  { path: 'clientlist', loadChildren: () => import('./modules/clientlist/clientlist.module').then(m => m.ClientlistModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
