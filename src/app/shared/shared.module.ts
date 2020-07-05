import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhonePipe } from './phone-pipe/phone.pipe';
import { OnlyNumbersDirective } from './only-numbers/only-numbers.directive';
import { NumberMaskPipe } from './number-mask-pipe/number-mask.pipe';

@NgModule({
  declarations: [
    PhonePipe,
    OnlyNumbersDirective,
    NumberMaskPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PhonePipe,
    OnlyNumbersDirective,
    NumberMaskPipe
  ]
})
export class SharedModule { }
