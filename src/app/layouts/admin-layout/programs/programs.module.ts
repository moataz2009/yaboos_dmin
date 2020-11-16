import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { ProgramsRoutingModule } from './programs-routing.module';
import { ProgramsComponent } from './programs.component';
import { MatInputModule } from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/Datepicker';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    ProgramsComponent
  ],
  imports: [
    CommonModule,
    ProgramsRoutingModule,
    FormsModule,
    SharedModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule

  ]
})
export class ProgramsModule { }
