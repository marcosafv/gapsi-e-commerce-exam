export interface Product {
  type: string;
  sku: string;
  name: string;
  image: string;
  description: string;
  price: number;
}

interface ProductsData {
  products: Product[];
}

interface GetProductsWrapper {
  data: ProductsData;
}

export interface GetProductsResponse {
  productsResponse: GetProductsWrapper;
}
