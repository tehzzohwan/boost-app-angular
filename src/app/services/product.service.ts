import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { Product, ApiResponse, Result } from '../products';
import { BoostAppService } from './boost-app.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private currentPage = new Subject<number>;

  products$ = this.productsSubject.asObservable();
  currentPage$ = this.currentPage.asObservable();

  constructor(private boostAppService: BoostAppService) {}

  getSearchResults(query?: string, page?: number): void {
    this.boostAppService.getAllProducts(query, page).subscribe((res: ApiResponse) => {
      console.log('res: ', res);
      this.productsSubject.next(res.data.products);
      this.currentPage.next(res.data.currentPage);
    });
  }
}
