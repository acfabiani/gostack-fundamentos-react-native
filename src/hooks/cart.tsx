import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface CartContext {
  products: Product[];
  addToCart(item: Omit<Product, 'quantity'>): void;
  increment(id: string): void;
  decrement(id: string): void;
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const storageProducts = await AsyncStorage.getItem(
        '@GoMarketplace:products',
      );

      if (storageProducts) {
        setProducts([...JSON.parse(storageProducts)]);
      }
    }

    loadProducts();
  }, []);

  const addToCart = useCallback(
    async (product: Product) => {
      // TODO ADD A NEW ITEM TO THE CART
      const productsCart = products;

      const productIndex = products.findIndex(item => item.id === product.id);

      if (productIndex > -1) {
        productsCart[productIndex].quantity += 1;
      } else {
        const newProduct = product;
        newProduct.quantity = 1;

        productsCart.push(newProduct);
      }

      setProducts([...productsCart]);

      await AsyncStorage.setItem(
        '@GoMarketplace:products',
        JSON.stringify(productsCart),
      );
    },
    [products],
  );

  const increment = useCallback(
    async id => {
      // TODO INCREMENTS A PRODUCT QUANTITY IN THE CART
      const updateProducts = products.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      );

      setProducts([...updateProducts]);

      await AsyncStorage.setItem(
        '@GoMarketplace:products',
        JSON.stringify(updateProducts),
      );
    },
    [products],
  );

  const decrement = useCallback(
    async id => {
      // TODO DECREMENTS A PRODUCT QUANTITY IN THE CART
      const updateProducts = products.filter(item => {
        if (item.id === id) {
          if (item.quantity > 1) {
            const p = item;
            p.quantity -= 1;
            return p;
          }
        } else {
          return item;
        }
      });

      setProducts([...updateProducts]);

      await AsyncStorage.setItem(
        '@GoMarketplace:products',
        JSON.stringify(updateProducts),
      );
    },
    [products],
  );

  const value = React.useMemo(
    () => ({ addToCart, increment, decrement, products }),
    [products, addToCart, increment, decrement],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };
