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
  private alert = new BehaviorSubject<string>('no');

  count$ = this.count.asObservable();
  alert$ = this.alert.asObservable();

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
    this.count.next(this.cartItems.length);
    this.alert.next('yes')
    setTimeout(() => {
      this.alert.next('');
    }, 3000);
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
    this.count.next(this.cartItems.length);
    this.alert.next('no');
    setTimeout(() => {
      this.alert.next('');
    }, 3000);
    
  }

  getAllCartItems() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
    return this.cartItems;
  }
}
