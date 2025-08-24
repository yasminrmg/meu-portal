import { createContext, useContext, Dispatch, SetStateAction, useState, useEffect  } from "react";
import { fetchProducts, deleteProductApi, updateProductApi, createProductApi  } from "./ProductsApi"


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
  createProduct: (product: Omit<Product, "id">) => Promise<void>;
  reloadProducts: () => Promise<void>;
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


export function ProductsProvider({ 
    children, 
    initialProducts  
  }: { 
    children: React.ReactNode; 
    initialProducts: Product[] 
  }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const reloadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
  };

  useEffect(() => {
    reloadProducts();
  }, []);

  const deleteProduct = async (id: number) => {
    try {
      await deleteProductApi(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  const updateProduct = async (id: number, updated: Partial<Product>) => {
    
    try {
      const saved = await updateProductApi(id, updated);
      setProducts(prev => prev.map(p => (p.id === id ? saved : p)));
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  };

  const createProduct = async (product: Omit<Product, "id">) => {
    try {
      const saved = await createProductApi(product);
      setProducts(prev => [...prev, saved]);
    } catch (error) {
      console.error("Erro ao criar produto:", error);
    }
  };

  return (
    <ProductsContext.Provider value={{ products, setProducts, deleteProduct, updateProduct, createProduct, reloadProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}