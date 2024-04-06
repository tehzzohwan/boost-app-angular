import { Component, OnInit } from '@angular/core';

import { BoostAppService } from '../services/boost-app.service';
import { CartService } from '../services/cart.service';
import { Category } from '../cartegory';

import { ApiResponse, CartProduct, Product } from '../products';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  products: Product[] = [];
  categories: Category = [];

  count$ = this.cartService.count$;

  constructor(
    private boostAppService: BoostAppService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.boostAppService
      .getCategories()
      .subscribe((categories) => {
        const category = categories.data.map(
          (category: Category) => category.name
        );
        this.categories = category.slice(0, 9);
      });
  }

  convertToTitleCase(input: string): string {
    return input
      .split('-')
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join(' ');
  }
}
