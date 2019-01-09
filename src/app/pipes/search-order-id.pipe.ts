import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordersIDFilter'
})
export class SearchOrderIdPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if (!args) {
      return value;
    }
    return value.filter((val) => {
      let rVal =  (val.idOrder == args);
      return rVal;
    })

    
  }

}
