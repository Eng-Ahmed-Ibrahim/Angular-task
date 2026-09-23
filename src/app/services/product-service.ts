import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductInterface } from '../interfaces/product-interface';
import { ToastrService } from '@relynn/ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(private httpClient: HttpClient, private toastr: ToastrService) { }
    getProducts(): Observable<any> {
        return this.httpClient.get('https://dummyjson.com/products');
    }
    getProductById(id: number): Observable<any> {
        return this.httpClient.get(`https://dummyjson.com/products/${id}`);
    }
    addToCart(product: ProductInterface) {
        console.log(product);
        const cartProduct = {
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            quantity: 1
        };
        const cartList = localStorage.getItem('cartList');
        const user = localStorage.getItem('user');
        if (user) {
            const userData: { email: string, name: string } = JSON.parse(user);
            if (cartList == null) {
                localStorage.setItem(
                    'cartList',
                    JSON.stringify([
                        {
                            email: userData.email,
                            products: [
                                {
                                    ...cartProduct,
                                    quantity: 1
                                }
                            ]
                        }
                    ])
                );
            } else if (cartList) {
                const list: {
                    email: string, products: {
                        id: number,
                        title: string,
                        price: number,
                        thumbnail: string,
                        quantity: number
                    }[]
                }[] = JSON.parse(cartList);
                const userCart = list.find((item) => item.email == userData.email)
                console.log("usercart ", userCart);

                if (!userCart) {
                    list.push({ email: userData.email, products: [{ ...cartProduct, quantity: 1 }] })
                } else {

                    const hasProduct = userCart?.products.find((item) => item.id == cartProduct.id);
                    if (!hasProduct) {
                        userCart?.products.push({ ...cartProduct, quantity: 1 });
                    } else {
                        const index = userCart?.products.findIndex(
                            item => item.id === product.id
                        );
                        userCart?.products.splice(index as number, 1, {
                            ...hasProduct,
                            quantity: hasProduct.quantity + 1
                        });
                    }
                    localStorage.setItem(
                        'cartList',
                        JSON.stringify(list)
                    );
                }
            }
        }
    }
}
