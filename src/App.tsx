import './App.css';
import React from 'react'
import PrincipalLayout from './Layouts/PrincipalLayout';
import Layout from './Layouts/PrincipalLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home, { productsLoader } from './Pages/Home';
import NovoProduto from './Pages/NovoProduto';



const router = createBrowserRouter([
  {
    path: '/',
    element: <PrincipalLayout />,
    children:[
      {
        index: true,
        element: <Home />,
        loader: productsLoader,
      },
      {
        path: '/novoProduto',
        element: <NovoProduto />
      }
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
