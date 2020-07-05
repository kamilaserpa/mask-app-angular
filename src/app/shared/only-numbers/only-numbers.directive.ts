import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]'
})
export class OnlyNumbersDirective {

  private navigationKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'Enter',
    'Escape',
    'Home',
    'End',
    'ArrowLeft',
    'ArrowRight',
    'Clear',
    'Copy',
    'Paste'
  ];
  inputElement: HTMLElement;

  constructor(public el: ElementRef) {
    this.inputElement = el.nativeElement;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (
      this.navigationKeys.indexOf(e.key) > -1 || // Permite: navigation keys: backspace, delete, arrows etc.
      (e.key === 'a' && e.ctrlKey === true) || // Permite: Ctrl+A
      (e.key === 'c' && e.ctrlKey === true) || // Permite: Ctrl+C
      (e.key === 'v' && e.ctrlKey === true) || // Permite: Ctrl+V
      (e.key === 'x' && e.ctrlKey === true) || // Permite: Ctrl+X
      (e.key === 'a' && e.metaKey === true) || // Permite: Cmd+A (Mac)
      (e.key === 'c' && e.metaKey === true) || // Permite: Cmd+C (Mac)
      (e.key === 'v' && e.metaKey === true) || // Permite: Cmd+V (Mac)
      (e.key === 'x' && e.metaKey === true) // Permite: Cmd+X (Mac)
    ) {
      // Ok
      return;
    }

    /**
     * Verificando se a tecla não é um número
     * (e.keyCode < 48 || e.keyCode > 57) -> Não são números da parte superior do teclado
     * (e.keyCode < 96 || e.keyCode > 105) -> Não são números do teclado numérico
     */
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      // Cancela o pressionamento da tecla
      e.preventDefault();
    }

  }

  @HostListener('keypress', ['$event'])
  onKeyPress(e: KeyboardEvent) {
    // Bloqueia caracteres como: !@#$%¨&*()/
    const charCode = (e.which) ? e.which : e.keyCode;
    if (e.keyCode > 31 && (e.keyCode < 48 || e.keyCode > 57)) {
      // Cancela o pressionamento da tecla
      e.preventDefault();
    }
  }

  // Ao colar valor
  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedInput: string = event.clipboardData
      .getData('text/plain')
      .replace(/\D/g, ''); // Remove caracteres não numéricos
    document.execCommand('insertText', false, pastedInput);
  }

  // Ao arrastar valor
  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    const textData = event.dataTransfer.getData('text').replace(/\D/g, '');
    this.inputElement.focus();
    document.execCommand('insertText', false, textData);
  }


}
