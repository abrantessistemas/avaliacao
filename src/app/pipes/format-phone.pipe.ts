import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPhonePipe'
})
export class FormatPhonePipe implements PipeTransform {

  phoneFormated = '';

  transform(phone: any) {
    if (phone != undefined && phone.length > 5) {
      const value = phone.toString().replace(/\D/g, '');

      if (value.length > 12) {
        this.phoneFormated = value.replace(/(\d{2})?(\d{2})?(\d{5})?(\d{4})/, '+$1 ($2) $3-$4');

      } else if (value.length > 11) {
        this.phoneFormated = value.replace(/(\d{2})?(\d{2})?(\d{4})?(\d{4})/, '+$1 ($2) $3-$4');

      } else if (value.length > 10) {
        this.phoneFormated = value.replace(/(\d{2})?(\d{5})?(\d{4})/, '($1) $2-$3');

      } else if (value.length > 9) {
        this.phoneFormated = value.replace(/(\d{2})?(\d{4})?(\d{4})/, '($1) $2-$3');

      } else if (value.length > 5) {
        this.phoneFormated = value.replace(/^(\d{2})?(\d{4})?(\d{0,4})/, '($1) $2-$3');

      } else if (value.length > 1) {
        this.phoneFormated = value.replace(/^(\d{2})?(\d{0,5})/, '($1) $2');
      } else {
        if (phone !== '') { this.phoneFormated = value.replace(/^(\d*)/, '($1'); }
      }
      return this.phoneFormated;
    }
    return this.phoneFormated;
  }
}
