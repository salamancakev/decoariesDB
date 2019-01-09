import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordersStatusFilter'
})
export class SearchOrderStatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      let rVal =  (val.Status.includes(args)) || (val.Status.toLocaleLowerCase().includes(args));
      return rVal;
    })
  }

}
