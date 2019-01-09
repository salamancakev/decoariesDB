import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'ordersClientFilter'
})
export class SearchOrderClientPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      let rVal =  (val.Client.includes(args)) || (val.Client.toLocaleLowerCase().includes(args));
      return rVal;
    })

  }

}