import { Component, input, output } from '@angular/core';
import { Header } from '../../organisms/header/header.component';
import { ProductsGrid } from '../../organisms/products/products.component';
import { Product } from '../../../shared/models/product.model';

@Component({
  selector: 'app-products-template',
  standalone: true,
  imports: [Header, ProductsGrid],
  templateUrl: './products-template.component.html',
  styleUrl: './products-template.component.css',
})
export class ProductsTemplate {
  public readonly title = input<string>('Productos');
  public readonly products = input<Product[]>([]);
  public readonly isLoading = input<boolean>(false);
  public readonly isLoadingMore = input<boolean>(false);
  public readonly hasMore = input<boolean>(true);
  public readonly errorMessage = input<string | null>(null);
  public readonly loadMore = output<void>();
}
