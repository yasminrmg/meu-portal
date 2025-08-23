import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  pictureUrl: string;
};



type ProductsContextType = {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
};

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts deve ser usado dentro de um ProductsProvider");
  }
  return context;
}


export function ProductsProvider({ children, initialProducts  }: { children: React.ReactNode; initialProducts: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}