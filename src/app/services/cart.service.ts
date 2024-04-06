import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Product, CartProduct } from '../products';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartProduct[] = [];

  constructor() {}

  private count = new BehaviorSubject<number>(0);

  count$ = this.count.asObservable();

  addToCart(product: Product) {
    let item: CartProduct = this.cartItems.find(
      (item) => item.id == product.id
    ) as CartProduct;

    if (item !== undefined) {
      item.qty += 1;
    } else {
      const newProduct: CartProduct = {
        ...product,
        qty: 1,
      };
      this.cartItems.push(newProduct);
    }
    alert(`Product added successfully`);
    this.count.next(this.cartItems.length);
  }

  removeFromCart(product: CartProduct) {
    let itemIndex = this.cartItems.findIndex(
      (item) => item.id === product.id
    ) as CartProduct | any;

    if (this.cartItems[itemIndex].qty > 1) {
      this.cartItems[itemIndex].qty -= 1;
    } else {
      this.cartItems.splice(itemIndex, 1);
    }
  }

  // declear a count variable
  // get cart items
  // then set the count with items.length
  //  when you add/remove to cart call this method

  getAllCartItems() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
    return this.cartItems;
  }
}
