import { Component, OnInit } from '@angular/core';

import { BoostAppService } from '../services/boost-app.service';
import { CartService } from '../services/cart.service';
import { Product } from '../products';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products$ = this.productService.products$;
  constructor(
    private boostAppService: BoostAppService,
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService.getSearchResults()
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
