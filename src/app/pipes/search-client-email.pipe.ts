import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clientsEmailFilter'
})
export class SearchClientEmailPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      let rVal = (val.Email.includes(args)) || (val.Email.toLocaleLowerCase().includes(args)) ;

      return rVal;
    })
  }

}
