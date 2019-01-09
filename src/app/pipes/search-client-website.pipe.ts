import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clientsWebsiteFilter'
})
export class SearchClientWebsitePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      let rVal = (val.Website.includes(args)) || (val.Website.toLocaleLowerCase().includes(args)) ;

      return rVal;
    })
  }

}
