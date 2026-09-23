import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductInterface } from '../interfaces/product-interface';
import { ToastrService } from '@relynn/ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(
        private httpClient: HttpClient,
        private toastr: ToastrService,
        ) { }
    getProducts(): Observable<any> {
        return this.httpClient.get('https://dummyjson.com/products');
    }
    getProductById(id: number): Observable<any> {
        return this.httpClient.get(`https://dummyjson.com/products/${id}`);
    }

}
