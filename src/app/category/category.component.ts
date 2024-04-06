import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoostAppService } from '../services/boost-app.service';
import { CartService } from '../services/cart.service';
import { Product, ApiResponse } from '../products';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  products?: Product[];

  category!: string;

  constructor(
    private route: ActivatedRoute,
    private boostAppService: BoostAppService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.category = params['category'];
      this.getProductsByCategory(this.category);
    });
  }
  
  convertToTitleCase(input: string): string {
    return input
      .split('-')
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join(' ');
  }

  getProductsByCategory(categoryName: string): void {
    this.boostAppService
      .getProductsByCategory(categoryName)
      .subscribe((res: ApiResponse) => {
        this.products = res.data;
      });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
