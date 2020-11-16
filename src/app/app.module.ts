import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor, JwtInterceptor } from './shared/services/api/interceptors';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login/login.component';
import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';
import { ComponentsModule } from './components/components.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    AdminLayoutModule,
    SharedModule,
    HttpClientModule,
    HttpModule,
    ComponentsModule,
    NgxSpinnerModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgbModule 
  ],
  declarations: [
    AppComponent,
    LoginComponent,
  ],


  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
    bootstrap: [AppComponent]
})

export class AppModule { }