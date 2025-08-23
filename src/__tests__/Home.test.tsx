import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../Pages/Home';
import { ProductsProvider, Product } from '../ProductsContext';
import { MemoryRouter } from 'react-router';

jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
  useOutletContext: () => ({ searchTerm: '' }), // valor fake
}));

const mockProducts: Product[] = [
    { id: 1, name: 'Produto A', description: 'Desc A', price: 10, category: 'Cat 1', pictureUrl: '/imgA.png' },
    { id: 2, name: 'Produto B', description: 'Desc B', price: 20, category: 'Cat 2', pictureUrl: '/imgB.png' },
];


    test('renderiza lista de produtos', () => {
        render(
            <MemoryRouter>
                <ProductsProvider initialProducts={mockProducts}>
                    <Home />
                </ProductsProvider>
            </MemoryRouter>
        );

        expect(screen.getByText('(1) Produto A')).toBeInTheDocument();
        expect(screen.getByText('(2) Produto B')).toBeInTheDocument();
    });

    test('filtra produtos com base no termo de busca', () => {
        jest.spyOn(require('react-router'), 'useOutletContext').mockReturnValue({ searchTerm: 'Produto A' });

        render(
            <MemoryRouter>
                <ProductsProvider initialProducts={mockProducts}>
                    <Home />
                </ProductsProvider>
            </MemoryRouter>
        );

        expect(screen.getByText('(1) Produto A')).toBeInTheDocument();
        expect(screen.queryByText('(2) Produto B')).not.toBeInTheDocument();
    });

