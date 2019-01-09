import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'clientsNameFilter'
})
export class SearchClientNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      let rVal = (val.Name.includes(args)) || (val.Name.toLocaleLowerCase().includes(args)) ;

      return rVal;
    })

  }

}