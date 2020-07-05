import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberMask'
})
export class NumberMaskPipe implements PipeTransform {

  transform(numberValue: any, arg: any): any {

    // CPF MASK
    if (arg === 'cpf' && numberValue) {
      const value = numberValue.toString().replace(/\D/g, '');

      if (value.length > 10) {
        return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.\$2.\$3\-\$4');
      } else if (value.length > 8) {
        return value.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2}).*/, '$1.$2.$3.$4');
      } else if (value.length > 5) {
        return value.replace(/^(\d{3})(\d{3})(\d{0,3}).*/, '$1.$2.$3');
      } else if (value.length > 2) {
        return value.replace(/^(\d{3})(\d{0,3}).*/, '$1.$2');
      } else {
        if (numberValue !== '') { return value; }
      }
      return '';
    }

    // CEP MASK
    if (arg === 'cep' && numberValue) {
      const value = numberValue.toString().replace(/\D/g, '');

      if (value.length > 4) {
        return value.replace(/^(\d{5})(\d{0,3}).*/, '$1-$2');
      } else {
        if (numberValue !== '') { return value; }
      }
      return '';
    }

    // NÚMEROS TELEFÔNICOS MASK
    if (arg === 'phone' && numberValue) {
      // Remove dígitos não numéricos
      const value = numberValue.toString().replace(/\D/g, '');

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
        if (numberValue !== '') { foneFormatado = value.replace(/^(\d*)/, '($1'); }
      }

      return foneFormatado;
    }
  }

}

