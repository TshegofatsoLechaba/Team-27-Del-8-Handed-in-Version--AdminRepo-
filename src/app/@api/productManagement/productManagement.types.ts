export interface ProductCategory {
  id: number;
  name: string;
  description: string;
}

export interface Product {
  id: number,
  name: string,
  description: string,
  categoryId: number,
  categoryName: string,
  photoUrl: string,
  quantityOnHand: number,
  flavours: Array<ProductFlavour>,
  sizes: Array<ProductSize>
}

export interface ProductFlavour {
  id: number,
  name: string,
}

export interface ProductSize {
  id: number,
  name: string,
  price: number
}
