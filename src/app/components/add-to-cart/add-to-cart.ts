import { Component, Input } from '@angular/core';
import { ProductInterface } from '../../interfaces/product-interface';
import { CartService } from '../../services/cart-service';

@Component({
  imports: [],
  selector: 'app-add-to-cart',
  styleUrl: './add-to-cart.css',
  templateUrl: './add-to-cart.html',
})
export class AddToCart {
  constructor(private cartService:CartService){}

  @Input() product!:ProductInterface | null;
    addToCart() {
      console.log(this.product);
      
      if (!this.product) {
        return;
      }
  
      this.cartService.addToCart(this.product);
    }
}
