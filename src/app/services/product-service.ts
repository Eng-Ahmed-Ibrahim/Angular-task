import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductInterface } from '../interfaces/product-interface';
import { ToastrService } from '@relynn/ngx-toastr';

@Injectable({
    providedIn:'root'
})
export class ProductService {
    constructor(private httpClient :HttpClient,private toastr:ToastrService){}
    getProducts():Observable<any>{
        return this.httpClient.get('https://dummyjson.com/products');
    }
    getProductById(id:number):Observable<any>{
        return this.httpClient.get(`https://dummyjson.com/products/${id}`);
    }
    addToCart(product:ProductInterface){
            const cartList = localStorage.getItem('cartList');
    if(cartList ==null){
      localStorage.setItem('cartList',JSON.stringify([product]));
    }else if(cartList){
      const list:ProductInterface[] = JSON.parse(cartList);
      const checkIfProductExist:boolean= 
      list.some(p=>p.id==product.id);
      if(checkIfProductExist){
        console.log("product already exists in cart");
        this.toastr.error("product already exists in cart")
        return ;
      }
      list.push(product);
      localStorage.setItem('cartList',JSON.stringify(list));
      this.toastr.success('addedd successfully')
    }
    }
}
