import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'specialCharacter',
})
export class SpecialCharacterPipe implements PipeTransform {
  transform(value: string): string {
    value = this.replaceAll(value, '&quot;', '"');
    value = this.replaceAll(value, '&#039;', "'");
    value = this.replaceAll(value, '&amp;', '&');
    return value;
  }

  replaceAll = function (value: string, search: string, replacement: string) {
    return value.replace(new RegExp(search, 'g'), replacement);
  };
}
