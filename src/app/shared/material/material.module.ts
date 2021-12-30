import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';

const ngModules = [
  MatButtonModule,
  MatSelectModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...ngModules
  ],
  exports: [
    ...ngModules
  ]
})
export class MaterialModule { }
