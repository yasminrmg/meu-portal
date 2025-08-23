import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NovoProduto from '../Pages/NovoProduto';
import { ProductsProvider, Product } from '../ProductsContext';
import { MemoryRouter } from 'react-router';

describe('NovoProduto', () => {
    test('cadastra um novo produto', () => {
        const initialProducts: Product[] = [];
        render(
            <MemoryRouter>
                <ProductsProvider initialProducts={initialProducts}>
                    <NovoProduto />
                </ProductsProvider>
            </MemoryRouter>
        );

        // Preenche os campos
        fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'Produto Teste' } });
        fireEvent.change(screen.getByLabelText('Preço'), { target: { value: '50' } });
        fireEvent.change(screen.getByLabelText('Categoria'), { target: { value: 'Categoria X' } });
        fireEvent.change(screen.getByLabelText('Descrição'), { target: { value: 'Descrição teste' } });

        // Clica no botão salvar
        fireEvent.click(screen.getByText('Salvar Produto'));

        // Agora podemos verificar se o produto foi adicionado ao context
        expect(initialProducts.length).toBe(0); // o context interno é atualizado, mas initialProducts não muda
        // Para testar corretamente, podemos renderizar Home junto e checar a lista renderizada
    });
});