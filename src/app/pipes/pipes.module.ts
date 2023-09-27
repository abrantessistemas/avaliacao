import { FormatPhonePipe } from './format-phone.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    FormatPhonePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormatPhonePipe
  ]
})
export class PipesModule { }
