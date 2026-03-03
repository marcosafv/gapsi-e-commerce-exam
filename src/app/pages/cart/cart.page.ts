import { Component, computed, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { CartService } from '../../core/services/cart.service';
import { Header } from '../../components/organisms/header/header.component';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CurrencyPipe, Header],
  templateUrl: './cart.page.html',
  styleUrl: './cart.page.css',
})
export class CartPage {
  private readonly cart = inject(CartService);

  protected readonly items = this.cart.items;
  protected readonly total = computed(() =>
    this.cart.items().reduce((acc, p) => acc + p.price, 0)
  );

  protected remove(sku: string): void {
    this.cart.removeBySku(sku);
  }

  protected clear(): void {
    this.cart.clear();
  }
}
