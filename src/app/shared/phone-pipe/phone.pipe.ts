import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(tel) {
    if (tel) {
      // Remove dígitos não numéricos
      const value = tel.toString().replace(/\D/g, '');

      let foneFormatado = '';

      // PP -> código do país, AA -> código da área
      if (value.length > 12) {
        // PPAA######## -> +PP (AA) #####-####
        foneFormatado = value.replace(/(\d{2})?(\d{2})?(\d{5})?(\d{4})/, '+$1 ($2) $3-$4');
      } else if (value.length > 11) {
        // PPAA######## -> +PP (AA) ####-####
        foneFormatado = value.replace(/(\d{2})?(\d{2})?(\d{4})?(\d{4})/, '+$1 ($2) $3-$4');
      } else if (value.length > 10) {
        // AA######### -> (AA) #####-####
        foneFormatado = value.replace(/(\d{2})?(\d{5})?(\d{4})/, '($1) $2-$3');
      } else if (value.length > 9) {
        // AA######### -> (AA) ####-####
        foneFormatado = value.replace(/(\d{2})?(\d{4})?(\d{4})/, '($1) $2-$3');
      } else if (value.length > 5) {
        // ####### -> (AA) ####-#
        foneFormatado = value.replace(/^(\d{2})?(\d{4})?(\d{0,4})/, '($1) $2-$3');
      } else if (value.length > 1) {
        // #### -> (AA) ##
        foneFormatado = value.replace(/^(\d{2})?(\d{0,5})/, '($1) $2');
      } else {
        if (tel !== '') { foneFormatado = value.replace(/^(\d*)/, '($1'); }
      }
      return foneFormatado;
    }
  }

}

