import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BoostAppService } from '../services/boost-app.service';
import { Product, ApiResponse, ApiResponseII, Result } from '../products';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css',
})
export class ItemDetailsComponent implements OnInit {
  products: Product[] = [];
  product?: Product;

  constructor(
    private boostAppService: BoostAppService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.getProductById();
  }

  getProducts(): void {
    this.boostAppService
      .getAllProducts()
      .subscribe((res: ApiResponse) => (this.products = res.data.products));
  }

  getProductById(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.boostAppService.getProductById(id).subscribe((res: ApiResponseII) => {
      this.product = res.data;
    });
  }
}
