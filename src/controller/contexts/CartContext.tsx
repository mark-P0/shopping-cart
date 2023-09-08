import { PropsWithChildren, createContext, useState } from "react";
import { Vehicle, VehicleID } from "../../model/vehicles.ts";

type Cart = Map<VehicleID, number>;
type CartContextValue = {
  cart: Cart;
  addToCart: (product: Vehicle, quantity: number) => void;
};
export const CartContext = createContext<CartContextValue | null>(null);

export function CartContextProvider(props: PropsWithChildren) {
  const { children } = props;
  const [cart, setCart] = useState<Cart>(new Map());
  console.log({ cart }); // DELETEME

  function addToCart({ id }: Vehicle, quantity: number) {
    const newCart = new Map(cart);
    const cartItemCt = newCart.get(id) ?? 0;
    newCart.set(id, cartItemCt + quantity);
    setCart(newCart);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
