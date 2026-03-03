import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatRippleModule } from '@angular/material/core';
import { Product } from '../../../shared/models/product.model';

@Component({
  selector: 'app-product-tile',
  standalone: true,
  imports: [CurrencyPipe, DragDropModule, MatRippleModule],
  templateUrl: './product-tile.component.html',
  styleUrl: './product-tile.component.css',
})
export class ProductTile {
  public readonly product = input.required<Product>();
}
