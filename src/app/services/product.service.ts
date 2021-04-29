import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map}  from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
 

  private baseUrl="http://localhost:8080/api/products";
  private categoryUrl = "http://localhost:8080/api/product-category";

  constructor(private httpClient: HttpClient) { }

  getProducts(categoryId: number): Observable<Product[]>{

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      map( response => response._embedded.product)
    )
  }

  getProductCategories(): Observable<ProductCategory[]>{

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map( response => response._embedded.productCategories)
    )

  }
}

interface GetResponseProduct{
  _embedded:{
    product: Product[];
  }
}
interface GetResponseProductCategory{
  _embedded:{
    productCategories: ProductCategory[];
  }
}