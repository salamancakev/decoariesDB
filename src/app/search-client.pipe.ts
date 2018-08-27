import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'clientsFilter'
})
export class SearchClientPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      let rVal
      if(val.createdBy!=null){
        rVal = (val.Email.includes(args)) || (val.Email.toLocaleLowerCase().includes(args)) || (val.Name.includes(args)) || (val.Name.toLocaleLowerCase().includes(args))  || (val.Gender.includes(args)) || (val.Gender.toLocaleLowerCase().includes(args))|| (val.Status.includes(args)) || (val.Status.toLocaleLowerCase().includes(args)) || (val.Company.includes(args)) || (val.Company.toLocaleLowerCase().includes(args)) || (val.createdBy.includes(args)) || (val.createdBy.toLocaleLowerCase().includes(args));

      }
      else{
              rVal = (val.Email.includes(args)) || (val.Email.toLocaleLowerCase().includes(args)) || (val.Name.includes(args)) || (val.Name.toLocaleLowerCase().includes(args))  || (val.Gender.includes(args)) || (val.Gender.toLocaleLowerCase().includes(args))|| (val.Status.includes(args)) || (val.Status.toLocaleLowerCase().includes(args)) || (val.Company.includes(args)) || (val.Company.toLocaleLowerCase().includes(args));

      }
      return rVal;
    })

  }

}