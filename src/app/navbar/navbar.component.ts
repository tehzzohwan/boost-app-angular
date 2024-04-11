import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';


import { BoostAppService } from '../services/boost-app.service';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
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
  products$ = this.productService.products$;
  searchTerms = new Subject<string>();

  constructor(
    private boostAppService: BoostAppService,
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  search(term: string): void {
    if (term.length > 3) {
      this.productService.getSearchResults(term);
    } else {
      this.productService.getSearchResults();
    }
  }

  getCategories(): void {
    this.boostAppService.getCategories().subscribe((categories) => {
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

//  two way bindind for the searchbar
// if the length of the character is > 3 fire the find all
