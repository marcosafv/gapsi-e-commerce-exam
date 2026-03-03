import { Component, computed, inject, signal } from '@angular/core';
import { Apollo } from 'apollo-angular';

import { GET_PRODUCTS } from '../../core/graphql/queries/product.queries';
import { GetProductsResponse, Product } from '../../shared/models/product.model';
import { ProductsTemplate } from '../../components/templates/products-template/products-template.component';
import { PRODUCTS_MOCK } from '../../shared/mocks/products.mock';
import { CartService } from '../../core/services/cart.service';

// Design Pattern: Observer / Reactive Programming (state + derived state via Angular Signals: signal/computed)
function isProduct(p: Partial<Product> | null | undefined): p is Product {
  return !!p &&
    typeof p.type === 'string' &&
    typeof p.sku === 'string' &&
    typeof p.name === 'string' &&
    typeof p.image === 'string' &&
    typeof p.description === 'string' &&
    typeof p.price === 'number';
}

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [ProductsTemplate],
  templateUrl: './products.page.html',
})
export class ProductsPage {
  private readonly apollo = inject(Apollo);
  private readonly cart = inject(CartService);

  private readonly MAX_PAGES = 4;

  private readonly _allProducts = signal<Product[]>([]);
  private readonly _isLoading = signal(true);
  private readonly _isLoadingMore = signal(false);
  private readonly _hasMore = signal(true);
  private readonly _errorMessage = signal<string | null>(null);
  private _page = 1;
  private _usedMockFallback = false;

  protected readonly vm = computed(() => ({
    products: (() => {
      const inCartSkus = new Set(this.cart.items().map((p) => p.sku));
      return this._allProducts().filter((p) => !inCartSkus.has(p.sku));
    })(),
    isLoading: this._isLoading(),
    isLoadingMore: this._isLoadingMore(),
    hasMore: this._hasMore(),
    errorMessage: this._errorMessage(),
  }));

  constructor() {
    this.loadPage();
  }

  protected loadMore(): void {
    if (this._isLoadingMore() || !this._hasMore()) return;
    this.loadPage();
  }

  private loadPage(): void {
    if (this._page > this.MAX_PAGES) {
      this._hasMore.set(false);
      this._isLoading.set(false);
      this._isLoadingMore.set(false);
      return;
    }

    const isFirst = this._page === 1;
    if (isFirst) {
      this._isLoading.set(true);
    } else {
      this._isLoadingMore.set(true);
    }

    console.log('[ProductsPage] loadPage', { page: this._page });

    this.apollo
      .query<GetProductsResponse>({
        query: GET_PRODUCTS,
        variables: { page: this._page },
        fetchPolicy: 'network-only',
      })
      .subscribe({
        next: (response) => {
          this._errorMessage.set(null);
          const products = (
            response.data?.productsResponse?.data?.products ?? []
          ).filter(isProduct);

          console.log('[ProductsPage] incoming', { count: products.length, page: this._page });

          const existingSkus = new Set(this._allProducts().map((p) => p.sku));
          const newProducts = products.filter((p) => !existingSkus.has(p.sku));

          console.log('[ProductsPage] merge', {
            page: this._page,
            newProducts: newProducts.length,
            totalBefore: this._allProducts().length,
          });

          if (newProducts.length > 0) {
            this._allProducts.update((prev) => [...prev, ...newProducts]);
          }

          if (products.length === 0) {
            this._hasMore.set(false);
          } else if (this._page >= this.MAX_PAGES) {
            this._hasMore.set(false);
          } else {
            this._page += 1;
            this._hasMore.set(true);
          }

          if (isFirst) this._isLoading.set(false);
          else this._isLoadingMore.set(false);
        },
        error: () => {
          if (this._usedMockFallback) {
            this._errorMessage.set('Error al cargar productos');
            this._hasMore.set(false);
          } else {
            this._errorMessage.set(null);
            this._usedMockFallback = true;
            this._allProducts.set(PRODUCTS_MOCK);
            this._hasMore.set(false);
          }
          if (isFirst) this._isLoading.set(false);
          else this._isLoadingMore.set(false);
        },
      });
  }
}
