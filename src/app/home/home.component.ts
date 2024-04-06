import { Component, OnInit } from '@angular/core';
import { BoostAppService } from '../services/boost-app.service';
import { CartService } from '../services/cart.service';
import { Product, ApiResponse } from '../products';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  constructor(
    private boostAppService: BoostAppService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.boostAppService
      .getAllProducts()
      .subscribe((res: ApiResponse) => (this.products = res.data));
  }

  addToCart(product: Product): void {
    this.cartService
    .addToCart(product)
  }
}
