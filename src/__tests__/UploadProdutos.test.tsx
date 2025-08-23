import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import UploadProdutos from '../Pages/UploadProdutos';
import * as ProductsHook from '../ProductsContext';
import { MemoryRouter } from 'react-router';
import { useNavigate } from 'react-router';

// Mock do useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useNavigate: () => mockNavigate,
}));

    const mockSetProducts = jest.fn();

    beforeEach(() => {
        mockSetProducts.mockClear();
        mockNavigate.mockClear();

        // Mock do useProducts
        jest.spyOn(ProductsHook, 'useProducts').mockReturnValue({
        products: [],
        setProducts: mockSetProducts,
        });
    });

    const renderComponent = () => {
        render(
        <MemoryRouter>
            <UploadProdutos />
        </MemoryRouter>
        );
    };

    test('renderiza input de upload e botão de salvar', () => {
        renderComponent();

        expect(screen.getByText(/importar produtos do csv/i)).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /salvar selecionados/i })).not.toBeInTheDocument();
        expect(screen.getByLabelText(/upload de arquivo/i)).toBeInTheDocument();
    });

    test('usuário consegue selecionar produtos do CSV e salvar', async () => {
        renderComponent();

        // Criar CSV fake
        const csvContent = `id,name,description,price,category,pictureUrl
    1,Produto A,Desc A,10,Cat1,/imgA.png
    2,Produto B,Desc B,20,Cat2,/imgB.png`;

        const file = new File([csvContent], 'produtos.csv', { type: 'text/csv' });

        // Simula upload
        const input = screen.getByLabelText(/upload de arquivo/i) as HTMLInputElement;
        Object.defineProperty(input, 'files', { value: [file] });
        fireEvent.change(input);

        // Os produtos devem aparecer na tela
        expect(await screen.findByText(/\(1\) Produto A/)).toBeInTheDocument();
        expect(await screen.findByText(/\(2\) Produto B/)).toBeInTheDocument();

        const checkbox1 = screen.getAllByRole('checkbox')[0];
        fireEvent.click(checkbox1);
        expect((checkbox1 as HTMLInputElement).checked).toBe(true);

        fireEvent.click(screen.getByRole('button', { name: /salvar selecionados/i }));

        const callArg = mockSetProducts.mock.calls[0][0];
        const newProducts = typeof callArg === 'function' ? callArg([]) : callArg;
        expect(newProducts).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ name: 'Produto A', price: 10, category: 'Cat1' })
            ])
        );

        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
