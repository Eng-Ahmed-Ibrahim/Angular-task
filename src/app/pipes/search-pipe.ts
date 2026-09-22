import { Pipe, PipeTransform } from '@angular/core';
import { ProductInterface } from '../interfaces/product-interface';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(products:ProductInterface[] , searchTerm:string): ProductInterface[] {
    return products.filter(product=>      
      product.title.toLowerCase()
        .includes(searchTerm.toLowerCase()) || 
        product.category.toLowerCase()
        .includes(searchTerm.toLocaleLowerCase())

      )
  }
}
