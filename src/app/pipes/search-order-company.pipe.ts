import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordersCompanyFilter'
})
export class SearchOrderCompanyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      let rVal =  (val.Company.includes(args)) || (val.Company.toLocaleLowerCase().includes(args));
      return rVal;
    })
  }

}
