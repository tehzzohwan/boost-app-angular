import { Component, OnInit } from '@angular/core';

import { CartService } from '../services/cart.service';
import { CartProduct, Product } from '../products';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  items: CartProduct[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getAllCartItems();
    this.totalPrice();
  }

  // get all cart items
  getAllCartItems(): void {
    this.items = this.cartService.getAllCartItems();
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.getAllCartItems();
    this.totalPrice();
  }

  removeFromCart(cartItem: CartProduct): void {
    this.cartService.removeFromCart(cartItem);
    this.totalPrice();
  }

  totalPrice(): number | void {
    this.total = this.items.reduce(
      (total, item) => total + item.price * item.qty,
      0
    );
  }
}
