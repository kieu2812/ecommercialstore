import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[]= [];
  totalPrice:number = 0;
  totalQuantity: number =0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {
    //get a handle to the cart items
    this.cartItems = this.cartService.cartItems;

    //subcribe to cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice =  data
    )

    //subcribe to cart totalQuantity

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
    //compute cart total price and quantity
    this.cartService.computeCartTotals();
  }

  increaseQuantity(item: CartItem){
    this.cartService.addToCart(item);
  }
  decreaseQuantity(item: CartItem){
      item.quantity--;
      if(item.quantity===0){
        this.cartService.removeCartItem(item);
      }
      else{
        this.cartService.computeCartTotals();
      }
  }

  removeFromCart(item: CartItem){
    this.cartService.removeCartItem(item);
  }
}
