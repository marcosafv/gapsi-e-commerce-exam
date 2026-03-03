import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

import { CartService } from '../../../core/services/cart.service';
import { Product } from '../../../shared/models/product.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, DragDropModule, MatButtonModule, MatBadgeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class Navbar {
  private readonly cart = inject(CartService);

  protected readonly cartCount = this.cart.count;

  protected clearCart(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.cart.clear();
  }

  protected onDropOnCart(event: CdkDragDrop<unknown>): void {
    const product = event.item.data as Product | undefined;
    if (!product) return;
    this.cart.add(product);
  }
}
