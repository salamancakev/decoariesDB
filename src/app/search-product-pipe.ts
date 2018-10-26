import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'productsFilter'
})
export class SearchProductPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
        let rVal
        if(val.Description!=null){
            rVal = (val.Name.includes(args)) || (val.Name.toLocaleLowerCase().includes(args)) || (val.Description.includes(args)) || (val.Description.toLocaleLowerCase().includes(args))  || (val.Size.includes(args));
        }
        else{
            rVal = (val.Name.includes(args)) || (val.Name.toLocaleLowerCase().includes(args)) || (val.Size.includes(args));
        }
      
      return rVal;
    })

  }

}