"use client";

import { ContextProps, ProductInfo } from "@/types";
import React, { ReactNode, createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const Context = createContext<ContextProps>({
  showCart: false,
  setShowCart: () => {},
  cartItems: [],
  setCartItems: () => {},
  totalPrice: 0,
  totalQuantity: 0,
  qty: 0,
  incQty: () => {},
  decQty: () => {},
  onAdd: (product: ProductInfo, quantity: number) => {},
  toggleCartItemQuantity: (id: string, value: string) => {},
  onRemove: (product: ProductInfo) => {},
  setTotalPrice: () => {},
  setTotalQuantity: () => {},
});

export const StateContext = ({ children }: { children: ReactNode }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<ProductInfo[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct: ProductInfo | undefined = undefined;
  let index;

  //Add item to cart
  const onAdd = (product: ProductInfo, quantity: number) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantity((prevTotalQuantities) => prevTotalQuantities + quantity);
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          setCartItems([
            { ...cartProduct, quantity: cartProduct.quantity + quantity }
          ]);
        }
      });
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to the cart`);
  };

  const onRemove = (product: ProductInfo) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct!.price * foundProduct!.quantity
    );
    setTotalQuantity(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct!.quantity
    );
    setCartItems(newCartItems);
  };
  //Increment/Decrement the popup cart items
  const toggleCartItemQuantity = (id: string, value: string) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === "inc") {
      let cart = [
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct!.quantity + 1 },
      ];
      //@ts-ignore
      setCartItems(cart);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct!.price);
      setTotalQuantity((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct!.quantity > 1) {
        let cart = [
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct!.quantity - 1 },
        ];
        //@ts-ignore
        setCartItems(cart);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct!.price);
        setTotalQuantity((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };
  //Increment item quantity
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  //Decrement item quantity
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        totalQuantity,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        setTotalPrice,
        setTotalQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
