import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clientsGenderFilter'
})
export class SearchClientGenderPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      let rVal = (val.Gender.includes(args)) || (val.Gender.toLocaleLowerCase().includes(args)) ;

      return rVal;
    })
  }

}
