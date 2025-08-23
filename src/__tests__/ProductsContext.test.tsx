import { renderHook, act } from '@testing-library/react';
import { ProductsProvider, useProducts, Product } from '../ProductsContext';
import React from 'react';

const initialProducts: Product[] = [
        { id: 1, name: 'Produto A', description: '', price: 10, category: 'Cat1', pictureUrl: '' }
];

describe('ProductsContext', () => {
    test('inicializa com produtos', () => {
        const wrapper = ({ children }: any) => <ProductsProvider initialProducts={initialProducts}>{children}</ProductsProvider>;
        const { result } = renderHook(() => useProducts(), { wrapper });

        expect(result.current.products).toHaveLength(1);
        expect(result.current.products[0].name).toBe('Produto A');
    });

    test('adiciona novo produto', () => {
        const wrapper = ({ children }: any) => <ProductsProvider initialProducts={initialProducts}>{children}</ProductsProvider>;
        const { result } = renderHook(() => useProducts(), { wrapper });

        act(() => {
            result.current.setProducts([...result.current.products, { id: 2, name: 'Produto B', description: '', price: 20, category: 'Cat2', pictureUrl: '' }]);
        });

        expect(result.current.products).toHaveLength(2);
        expect(result.current.products[1].name).toBe('Produto B');
    });
});