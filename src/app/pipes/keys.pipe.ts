import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value);
    if (value === null) {
      return value;
    } else {
      return Object.keys(value);
    }
  }

}
