import { gql } from 'apollo-angular';

export const GET_PRODUCTS = gql`
  query GetProducts($page: Int!) {
    productsResponse(page: $page)
      @rest(type: "GetProductsWrapper", path: "products?page={args.page}") {
      data {
        products {
          type
          sku
          name
          image
          description
          price
        }
      }
    }
  }
`;
