import { createContext, useContext, Dispatch, SetStateAction, useState, useEffect  } from "react";
import { fetchProducts, deleteProductApi, updateProductApi } from "./ProductsApi"

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
  deleteProduct: (id: number) => Promise<void>;
  updateProduct: (id: number, updated: Partial<Product>) => Promise<void>;
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

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const deleteProduct = async (id: number) => {
    await deleteProductApi(id);
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateProduct = async (id: number, updated: Partial<Product>) => {
    const saved = await updateProductApi(id, updated);
    setProducts(prev => prev.map(p => (p.id === id ? saved : p)));
  };

  return (
    <ProductsContext.Provider value={{ products, setProducts, deleteProduct, updateProduct }}>
      {children}
    </ProductsContext.Provider>
  );
}