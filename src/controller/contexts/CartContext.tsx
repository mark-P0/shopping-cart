import { PropsWithChildren, createContext, useState } from "react";
import { Vehicle } from "../../model/vehicles.ts";

type Cart = Map<Vehicle["id"], number>;
type CartContextProvision = {
  cart: Cart;
  addToCart: (product: Vehicle, quantity: number) => void;
};
export const CartContext = createContext<CartContextProvision | null>(null);

export function CartContextProvider(props: PropsWithChildren) {
  const { children } = props;
  const [cart, setCart] = useState<Cart>(new Map());
  console.log({ cart }); // DELETEME

  function addToCart({ id }: Vehicle, quantity: number) {
    const newCart = new Map(cart); // Best practice is to create new object, but maybe can reuse
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
