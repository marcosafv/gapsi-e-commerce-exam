import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../../shared/models/product.model';

// Design Pattern: Singleton (Angular DI provides a single shared instance via providedIn: 'root')
@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _items = signal<Product[]>([]);

  public readonly items = this._items.asReadonly();
  public readonly count = computed(() => this._items().length);

  public add(product: Product): void {
    this._items.update((prev) => [...prev, product]);
  }

  public removeBySku(sku: string): void {
    this._items.update((prev) => {
      const index = prev.findIndex((p) => p.sku === sku);
      if (index < 0) return prev;
      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    });
  }

  public clear(): void {
    this._items.set([]);
  }
}
