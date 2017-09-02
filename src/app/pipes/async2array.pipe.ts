import { Pipe, PipeTransform } from '@angular/core';
// todo: rename to unnormalizingState or itemsValueArray
@Pipe({
  name: 'async2array',
  pure: false
})
export class Async2arrayPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value && 'items' in value
      && value.items && typeof value.items === 'object') {
      return Object.keys(value.items).map(key => value.items[key]);
    } else {
      return null;
    }
  }

}
