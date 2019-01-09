import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clientsStatusFilter'
})
export class SearchClientStatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      let rVal = (val.Status.includes(args)) || (val.Status.toLocaleLowerCase().includes(args)) ;

      return rVal;
    })
  }

}
