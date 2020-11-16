import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestesRoutingModule } from './requestes-routing.module';
import { RequestsComponent } from './requests/requests.component';


@NgModule({
  declarations: [RequestsComponent],
  imports: [
    CommonModule,
    RequestesRoutingModule
  ]
})
export class RequestesModule { }
