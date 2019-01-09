import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordersPriceFilter'
})
export class SearchOrderPricePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      let rVal =  (val.Price == args);
      return rVal;
    })
  }

}
