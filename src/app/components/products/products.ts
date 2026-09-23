import { Component, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { ProductInterface } from '../../interfaces/product-interface';
import { TransformPipe } from '../../pipes/transform-pipe';
import { LimitTextPipe } from '../../pipes/limit-text-pipe';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../pipes/search-pipe';
import { ToastrService } from '@relynn/ngx-toastr';
import { RouterLink } from '@angular/router';
import { AddToCart } from '../add-to-cart/add-to-cart';
import { CurrencyPipe } from '@angular/common';
@Component({
  imports: [TransformPipe,CurrencyPipe, LimitTextPipe, FormsModule, SearchPipe, RouterLink, AddToCart],
  selector: 'app-products',
  styleUrl: './products.css',
  templateUrl: './products.html',
})
export class Products implements OnInit {
  constructor(private productService:ProductService, private toastr: ToastrService){}
  ngOnInit(): void {
    this.getProducts();
  }
  products$=signal<ProductInterface[]>([])
  searchTerm:string = '';

  getProducts(){
    this.productService.getProducts().subscribe({
      next:(data)=>{this.products$.set(data.products)
        console.log(data)
      }
      ,
      error:(error)=>console.log(error),
      complete:()=>console.log("Compoleted")
    })
  }

}
