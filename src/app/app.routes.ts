import { Routes } from '@angular/router';

import { WelcomePage } from './pages/welcome/welcome.page';
import { ProductsPage } from '@pages/products/products.page';
import { CartPage } from './pages/cart/cart.page';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WelcomePage,
  },
  {
    path: 'products',
    component: ProductsPage,
  },
  {
    path: 'cart',
    component: CartPage,
  },
];
