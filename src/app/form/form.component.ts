import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  phoneNumbers: Array<string>;
  cpfNumbers: Array<string>;
  cepNumbers: Array<string>;

  phone1: number;
  phone2: number;
  phone3: number;
  phone4: number;
  phone5: number;
  phone6: number;
  phone7: number;
  phone8: number;
  phone9: number;

  cpf: number;
  cep: number;

  maskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.maskForm = this.fb.group({
      phone: ['', [Validators.pattern(/^\(\d{2}\)\s\d{4}-\d{4,5}$/), Validators.required]]
    });
  }

  ngOnInit(): void {
    this.phoneNumbers = [
      '1133224455',
      '21 88776655',
      '(85)33224455',
      '853322-4455',
      '85988776655',
      '5585988776655',
      '+55859 88776655',
      '+55(85)98877-6655',
      '+5585988776655',
    ];

    this.cpfNumbers = [
      '12345678912',
      '012.345.678-90',
      '123456789-12'
    ];

    this.cepNumbers = [
      '12345678',
      '12.345-678',
      '12345-678'
    ];

  }

  showValue(field) {
    let withoutMask = '';
    if (field) { withoutMask = field.replace(/\D+/g, '') };
    alert('Valor da variável: "' + field + '". Apenas números: "' + withoutMask + '"');
  }

  onlyNumbers(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    } else {
      return true;
    }
  }

  public phoneMask(event) {
    // Permite Backspace para usuário remover ")" e "-"
    if (event.keyCode === 8 && this.deletandoCaracter(event.target.value)) { return; }
    event.target.value = this.maskPhone(event.target.value);
  }

  maskPhone(value) {
    let tel = value.replace(/\D/g, '');
    tel = tel.replace(/^0/, '');
    if (tel.length > 10) {
      // ########## -> (##) #####-####
      tel = tel.replace(/^(\d{2})?(\d{5})?(\d{4}).*/, '($1) $2-$3');
    } else if (tel.length > 9) {
      // AA######### -> (AA) ####-####
      tel = tel.replace(/^(\d{2})?(\d{4})?(\d{4}).*/, '($1) $2-$3');
    } else if (tel.length > 5) {
      // ####### -> (##) ####-#
      tel = tel.replace(/^(\d{2})?(\d{4})?(\d{0,4}).*/, '($1) $2-$3');
    } else if (tel.length > 1) {
      // #### -> (##) ##
      tel = tel.replace(/^(\d{2})?(\d{0,5})/, '($1) $2');
    } else {
      if (tel !== '') { tel = tel.replace(/^(\d*)/, '($1'); }
    }
    return tel;
  }

  deletandoCaracter(value) {
   if (value.length === 9 || value.length === 4 || value.length === 3) {
    return true;
   }
  }

  getValue(event) {
    return event.replace(/\D/g, '');
  }

}
