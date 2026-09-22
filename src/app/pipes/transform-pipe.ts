import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transform',
})
export class TransformPipe implements PipeTransform {
  transform(text:string,limit:number): unknown {
    return text.split(' ').slice(0,limit).join(' ');
  }
}
