import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { symbolName } from 'typescript';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product= new Product();
  constructor(private productService: ProductService,
      private route: ActivatedRoute){

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() =>{
      this.handleProductDetails();
    })
  }
  handleProductDetails() {
    //get the id param String, convert string to a number using the "+" symbol
    const theProductId: number =+ this.route.snapshot.paramMap.get('id');
    console.log(theProductId);
    this.productService.getProductById(theProductId).subscribe(
      data => {
        this.product= data;
      }    
    )
    console.log(this.product);
  }

}
