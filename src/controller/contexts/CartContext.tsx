import { PropsWithChildren, createContext, useState } from "react";
import { Vehicle } from "../../model/vehicles.ts";

type Cart = Map<Vehicle["id"], number>;
type CartProvision = {
  cart: Cart;
  addToCart: (product: Vehicle, quantity: number) => void;
};
export const CartContext = createContext<CartProvision | null>(null);

export function CartContextProvider(props: PropsWithChildren) {
  const { children } = props;
  const [cart, setCart] = useState<Cart>(new Map());
  console.log({ cart }); // DELETEME

  function addToCart({ id }: Vehicle, quantity: number) {
    const existingCt = cart.get(id) ?? 0;
    const cartEntriesWithoutItemToAdd = [...cart.entries()].filter(
      ([cartItemId]) => cartItemId !== id
    );
    const newCart = new Map(cartEntriesWithoutItemToAdd); // Rebuild cart without item to add
    newCart.set(id, existingCt + quantity); // Maps keep insertion order; this will ensure that the item added will be "bumped" to the end of the cart
    setCart(newCart); // Set rebuilt cart as THE cart
  }

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
