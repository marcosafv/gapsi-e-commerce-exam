import { AfterViewInit, Component, DestroyRef, ViewChild, computed, effect, input, output, inject } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, map, throttleTime } from 'rxjs';
import { Product } from '../../../shared/models/product.model';
import { ProductTile } from '../../molecules/product-tile/product-tile.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [DragDropModule, ScrollingModule, ProductTile],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsGrid implements AfterViewInit {
  private readonly destroyRef = inject(DestroyRef);

  @ViewChild(CdkVirtualScrollViewport)
  private readonly viewport?: CdkVirtualScrollViewport;

  public readonly products = input<Product[]>([]);
  public readonly isLoadingMore = input<boolean>(false);
  public readonly hasMore = input<boolean>(true);
  public readonly loadMore = output<void>();

  private _autoLoadAttempts = 0;

  protected readonly COLS = 3;
  protected readonly ROW_HEIGHT = 280;

  protected readonly rows = computed(() => {
    const allProducts = this.products();
    const result: Product[][] = [];
    for (let i = 0; i < allProducts.length; i += this.COLS) {
      result.push(allProducts.slice(i, i + this.COLS));
    }
    return result;
  });

  constructor() {
    effect(() => {
      const totalRows = this.rows().length;
      const canAutoLoad = this.hasMore() && !this.isLoadingMore();

      if (canAutoLoad && totalRows > 0 && totalRows < 4 && this._autoLoadAttempts < 2) {
        this._autoLoadAttempts += 1;
        queueMicrotask(() => this.loadMore.emit());
      }
    });
  }

  public ngAfterViewInit(): void {
    if (!this.viewport) return;

    this.viewport
      .elementScrolled()
      .pipe(
        throttleTime(150, undefined, { leading: true, trailing: true }),
        map(() => this.viewport?.measureScrollOffset('bottom') ?? Number.POSITIVE_INFINITY),
        filter((bottom) => bottom < 320),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        if (this.hasMore() && !this.isLoadingMore()) {
          this.loadMore.emit();
        }
      });
  }
}
