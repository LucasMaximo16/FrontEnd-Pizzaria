export interface ItemCarrinhoDTO {
  amount: number;
  created_at: string;
  id: string;
  order: {
    id: string;
    table: number;
    status: boolean;
    draft: boolean;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  order_id: string;
  product: {
    id: string;
    name: string;
    price: string;
    description: string;
    banner: string;
  };
  product_id: string;
  updated_at: string;
}
