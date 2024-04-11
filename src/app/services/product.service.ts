import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Product, ApiResponse } from '../products';
import { BoostAppService } from './boost-app.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private productsSubject = new BehaviorSubject<Product[]>([]);

  products$ = this.productsSubject.asObservable();


  constructor(private boostAppService: BoostAppService) {
  }


  getSearchResults(query?: string): void {
      this.boostAppService
        .getAllProducts(query)
        .subscribe((res: ApiResponse) => {
          this.productsSubject.next(res.data.products);
        });
  }
}
