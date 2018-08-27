import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'usersFilter'
})
export class SearchUserPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      let rVal = (val.Email.includes(args)) || (val.Email.toLocaleLowerCase().includes(args)) || (val.Name.includes(args)) || (val.Name.toLocaleLowerCase().includes(args))  || (val.Type.includes(args)) || (val.Type.toLocaleLowerCase().includes(args));
      return rVal;
    })

  }

}