import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clientsDateFilter'
})
export class SearchClientDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      let rVal = (val.createDate.includes(args));

      return rVal;
    })
  }

}
