import { Injectable, Service } from '@angular/core';
import { ProductCartInterFace, ProductInterface } from '../interfaces/product-interface';
import { ToastrService } from '@relynn/ngx-toastr';

@Injectable({
    providedIn: "root"
})
export class CartService {
    constructor(private toastr: ToastrService) { }
    addToCart(product: ProductCartInterFace) {
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
                    email: string, products: ProductCartInterFace[]
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
        this.toastr.success("Added To Cart")

    }
    getCart(): ProductCartInterFace[] {
        const user = localStorage.getItem('user');
        const cart = localStorage.getItem('cartList');
        if (user && cart) {
            const userData: { email: string, name: string } = JSON.parse(user);
            const cartList: { email: string, products: ProductCartInterFace[] }[] = JSON.parse(cart);
            const currentUserCartList = cartList.find((item) => item.email == userData.email)
            if (currentUserCartList?.products) {
                return (currentUserCartList.products);
            }

        }
        return [];
    }

}
