import './App.css';
import React from 'react'
import PrincipalLayout from './Layouts/PrincipalLayout';
import Layout from './Layouts/PrincipalLayout';
import { createBrowserRouter, RouterProvider, useLoaderData } from 'react-router-dom';
import Home from './Pages/Home';
import NovoProduto from './Pages/NovoProduto';
import { ProductsProvider, Product } from "./ProductsContext";

const productsLoader = async()=>{
  const response = await fetch('/data/data.json');
  const products = await response.json();
  return products;
}

function Root() {
  const initialProducts = useLoaderData() as Product[];

  return (
    <ProductsProvider initialProducts={initialProducts}>
      <PrincipalLayout />
    </ProductsProvider>
  );
}
const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    loader: productsLoader,
    children:[
      {
        index: true,
        Component: Home,
      },
      {
        path: '/novoProduto',
        Component: NovoProduto,
      }
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
