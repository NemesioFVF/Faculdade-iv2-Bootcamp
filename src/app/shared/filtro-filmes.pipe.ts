import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroFilme'
})
export class FiltroFilmePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) return null;
    if (!args) return value;
    args = args.toLowerCase();
    return value.filter((data: any) => {
      return JSON.stringify(data).toLowerCase().includes(args);
    });
  }

}
