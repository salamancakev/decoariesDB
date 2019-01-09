import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordersDateFilter'
})
export class SearchOrderDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      let rVal =  (val.Date.includes(args));
      return rVal;
    })
  }

}
