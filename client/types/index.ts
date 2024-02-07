import { SetStateAction, Dispatch } from "react";
export interface Product {
  slug: {
    current: string;
  };
}

export interface ProductInfo {
  image: [
    {
      _type: string;
      _key: string;
      asset: {
        _ref: string;
        _type: string;
      };
    }
  ];
  price: number;
  _type: string;
  details: string;
  _createdAt: string;
  _rev: string;
  name: string;
  _id: string;
  _updatedAt: string;
  slug: {
    current: string;
    _type: string;
  };
  quantity: number;
}

export interface BannerProps {
  _updatedAt: string;
  product: string;
  _rev: string;
  midText: string;
  saleTime: string;
  _createdAt: string;
  discount: string;
  smallText: string;
  largeText1: string;
  largeText2: string;
  desc: string;
  buttonText: string;
  image: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  _type: string;
  _id: string;
}

export interface ContextProps {
  showCart: boolean;
  setShowCart: Dispatch<SetStateAction<boolean>>;
  cartItems: ProductInfo[];
  setCartItems: Dispatch<SetStateAction<ProductInfo[]>>;
  totalPrice: number;
  totalQuantity: number;
  qty: number;
  incQty: () => void;
  decQty: () => void;
  onAdd: (product: ProductInfo, quantity: number) => void;
  toggleCartItemQuantity: (id: string, value: string) => void;
  onRemove: (product: ProductInfo) => void;
  setTotalPrice: Dispatch<SetStateAction<number>>;
  setTotalQuantity: Dispatch<SetStateAction<number>>;
}
