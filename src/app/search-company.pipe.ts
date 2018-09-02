import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'companiesFilter'
})
export class SearchCompanyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      let rVal
      if(val.createdBy!=null){
        rVal = (val.Company.includes(args)) || (val.Company.toLocaleLowerCase().includes(args))  || (val.Website.includes(args)) || (val.Website.toLocaleLowerCase().includes(args))|| (val.createdBy.includes(args)) || (val.createdBy.toLocaleLowerCase().includes(args)) || (val.From.includes(args)) || (val.From.toLocaleLowerCase().includes(args));

      }
      else{
              rVal = (val.Company.includes(args)) || (val.Company.toLocaleLowerCase().includes(args)) || (val.Website.includes(args)) || (val.Website.toLocaleLowerCase().includes(args));

      }
      return rVal;
    })

  }

}