import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestsComponent } from './requests/requests.component';


const routes: Routes = [{
  path: '',
  component: RequestsComponent,
      children: [
        {
          path: '',
          redirectTo: 'list',
          pathMatch: 'full'
        },
        {
          path: 'list',
          component: RequestsComponent,

        },
 
      ]     
  
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestesRoutingModule { }
