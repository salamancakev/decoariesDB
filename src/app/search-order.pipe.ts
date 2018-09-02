import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'ordersFilter'
})
export class SearchOrderPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      let rVal =  (val.idOrder==args) || (val.Client.includes(args)) || (val.Client.toLocaleLowerCase().includes(args)) || (val.Company.includes(args)) || (val.Company.toLocaleLowerCase().includes(args)) || (val.Date.includes(args))|| (val.Status.includes(args)) || (val.Status.toLocaleLowerCase().includes(args)) ;
      return rVal;
    })

  }

}