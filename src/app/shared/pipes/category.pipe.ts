import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: String): String {
    switch(value){
      case 'front end':return'code';
      case 'back end': return'computer';
    }
    return 'code';
  }

}
