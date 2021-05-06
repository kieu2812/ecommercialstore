import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl: string = 'http://localhost:8080/api/products';
  private categoryUrl: string = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) {}

  getProducts(categoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    return this.callGetProducts(searchUrl);
  }
  getProductsPaginate(thePage: number,
                      thePageSize: number,
                      categoryId: number
                    ): Observable<GetResponseProduct> {
    const searchUrl =
      `${this.baseUrl}/search/findByCategoryId?id=${categoryId}` +
      `&page=${thePage}&size=${thePageSize}`;
    console.log(searchUrl);
    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetResponseProductCategory>(this.categoryUrl)
      .pipe(map((response) => response._embedded.productCategories));
  }

  searchProducts(theKeyWord: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyWord}`;
    return this.callGetProducts(searchUrl);
  }

  searchProductsPaginate( theKeyWord: string,
                          thePage: number,
                          thePageSize: number
                        ): Observable<GetResponseProduct> {
    const searchUrl =`${this.baseUrl}/search/findByNameContaining?name=${theKeyWord}`
              +      `&page=${thePage}&size=${thePageSize}`;
    console.log(searchUrl);
    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }
  private callGetProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient
      .get<GetResponseProduct>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }

  private callGetProductsPaginate(searchUrl: string) {
    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }
  getProductById(theProductId: number): Observable<Product> {
    const productDetailUrl = `${this.baseUrl}/${theProductId}`;
    console.log(productDetailUrl);
    return this.httpClient.get<Product>(productDetailUrl);
  }
}

interface GetResponseProduct {
  _embedded: {
    products: Product[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
interface GetResponseProductCategory {
  _embedded: {
    productCategories: ProductCategory[];
  };
}
