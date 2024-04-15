import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

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
  currentPage$ = this.productService.currentPage$;
  firstPage: boolean = false;
  lastPage: boolean = false;

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {
    this.getAllProducts();
    // this.currentPage$.pipe(take(1)).subscribe((page) => {
    //   console.log('pageGet: ', typeof page);
    //   if (page == 1) {
    //     this.firstPage = true;
    //     this.lastPage = true;
    //     console.log('firstPage: ', this.firstPage);
    //   }
    // });
  }

  ngOnInit(): void {}

  // previousPage(): void {
  //   alert('Previous page');
  //   this.currentPage$.pipe(take(1)).subscribe((page) => {
  //     console.log('page: ', page);
  //     const pageNum = page - 1;
  //     this.getAllProducts(undefined, pageNum);
  //   });
  // }

  // nextPage(): void {
  //   alert('next page');
  //   this.currentPage$.pipe(take(1)).subscribe((page) => {
  //     const pageNum = page + 1;
  //     this.getAllProducts(undefined, pageNum);
  //   });
  // }

  getAllProducts(query?: string, page?: number): void {
    this.productService.getSearchResults(query, page);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
