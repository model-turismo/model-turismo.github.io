import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any, field: any ): any {
    const resultEntry = [];

    for(const entry of value){
      if(field=='all'
      || (field=='dni' && entry.dni.toLowerCase().indexOf(arg.toLowerCase()) > -1 )
      || (field=='nombre' && entry.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1)){
        
        resultEntry.push(entry);
      };
    };

    return resultEntry;
  }

}
