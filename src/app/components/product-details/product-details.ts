import { Component, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { ActivatedRoute } from '@angular/router';
import { ProductInterface } from '../../interfaces/product-interface';

@Component({
  imports: [],
  selector: 'app-product-details',
  styleUrl: './product-details.css',
  templateUrl: './product-details.html',
})
export class ProductDetails implements OnInit {
  constructor(private route: ActivatedRoute, private productService: ProductService) { }
  product = signal<ProductInterface | null>(null)
  ngOnInit(): void {
    this.getProduct();
  }
  getProduct() {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe({
      next: (data) => this.product.set(data),
      error: (error) => console.log(error),
      complete: () => console.log("Compeleted")
    })
  }
  addToCart(product: ProductInterface | null) {
    if (!product) {
      return;
    }

    this.productService.addToCart(product);
  }
}
