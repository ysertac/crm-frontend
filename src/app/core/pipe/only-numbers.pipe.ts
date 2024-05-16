import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'onlyNumbers',
  standalone: true,
})
export class OnlyNumbersPipe implements PipeTransform {
  transform(value: any): any {
    return value.replace(/[^0-9]*/g, '');
  }
}
