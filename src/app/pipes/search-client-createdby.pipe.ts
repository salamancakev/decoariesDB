import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clientsCreatedByFilter'
})
export class SearchClientCreatedbyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      let rVal = (val.createdBy.includes(args)) || (val.createdBy.toLocaleLowerCase().includes(args)) ;

      return rVal;
    })
  }

}
