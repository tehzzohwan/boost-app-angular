import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, map } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Product, ApiResponse, ApiResponseII } from '../products';
import { Category } from '../cartegory';

@Injectable({
  providedIn: 'root',
})
export class BoostAppService {
  private baseUrl = 'http://localhost:8080/api/products/';
  private getProductByIdUrl = 'http://localhost:8080/api/products';
  private getCategoriesUrl = 'http://localhost:8080/api/products/category';
  private getProductsByCategoryUrl =
    'http://localhost:8080/api/products/category';

  category: any;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<ApiResponse> {
    return this.http
      .get<ApiResponse>(this.baseUrl)
      .pipe(catchError(this.handleError<ApiResponse>('getProducts')));
  }

  getProductById(id: number): Observable<ApiResponseII> {
    return this.http.get<ApiResponseII>(this.baseUrl + id);
  }

  getCategories(): Observable<Category> {
    return this.http
      .get<Product[]>(this.getCategoriesUrl)
      .pipe(catchError(this.handleError<Product[]>('getCategories')));
  }

  getProductsByCategory(categoryName: string): Observable<ApiResponse> {
    let url = `${this.getProductsByCategoryUrl}/${categoryName}`;
    return this.http.get<ApiResponse>(url);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
