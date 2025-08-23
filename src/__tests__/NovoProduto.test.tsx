import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NovoProduto from '../Pages/NovoProduto';
import { MemoryRouter } from 'react-router';
import * as ProductsHook from '../ProductsContext';

// Mock do useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useNavigate: () => mockNavigate,
}));

describe('NovoProduto', () => {
    const mockSetProducts = jest.fn();

    beforeEach(() => {
        mockSetProducts.mockClear();
        mockNavigate.mockClear();

        // Mock do hook useProducts
        jest.spyOn(ProductsHook, 'useProducts').mockReturnValue({
            products: [],
            setProducts: mockSetProducts,
        });
    });

    const renderComponent = () => {
        render(
        <MemoryRouter>
            <NovoProduto />
        </MemoryRouter>
        );
    };

    test('renderiza todos os campos e botões', () => {
        renderComponent();

        expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/preço/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/categoria/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/url da imagem/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /salvar produto/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
    });

    test('usuário consegue digitar nos campos', () => {
        renderComponent();

        const nomeInput = screen.getByLabelText(/nome/i) as HTMLInputElement;
        fireEvent.change(nomeInput, { target: { value: 'Produto Teste' } });
        expect(nomeInput.value).toBe('Produto Teste');

        const precoInput = screen.getByLabelText(/preço/i) as HTMLInputElement;
        fireEvent.change(precoInput, { target: { value: '50' } });
        expect(precoInput.value).toBe('50');

        const categoryInput = screen.getByLabelText(/categoria/i) as HTMLInputElement;
        fireEvent.change(categoryInput, { target: { value: 'Cat 1' } });
        expect(categoryInput.value).toBe('Cat 1');

        const descInput = screen.getByLabelText(/descrição/i) as HTMLTextAreaElement;
        fireEvent.change(descInput, { target: { value: 'Descrição teste' } });
        expect(descInput.value).toBe('Descrição teste');
    });

    test('mostra mensagens de validação se campos obrigatórios estiverem vazios', () => {
        renderComponent();

        fireEvent.click(screen.getByRole('button', { name: /salvar produto/i }));

        expect(screen.getByText(/nome é obrigatório/i)).toBeInTheDocument();
        expect(screen.getByText(/preço deve ser maior que zero/i)).toBeInTheDocument();
        expect(screen.getByText(/categoria é obrigatória/i)).toBeInTheDocument();
        expect(screen.getByText(/descrição é obrigatória/i)).toBeInTheDocument();

        expect(mockSetProducts).not.toHaveBeenCalled();
        expect(mockNavigate).not.toHaveBeenCalled();
    });

    test('ao preencher corretamente e clicar em salvar, produto é adicionado e navega para "/"', () => {
        renderComponent();

        // Preenche os campos
        fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Produto Teste' } });
        fireEvent.change(screen.getByLabelText(/preço/i), { target: { value: '50' } });
        fireEvent.change(screen.getByLabelText(/categoria/i), { target: { value: 'Cat 1' } });
        fireEvent.change(screen.getByLabelText(/descrição/i), { target: { value: 'Descrição teste' } });

        fireEvent.click(screen.getByRole('button', { name: /salvar produto/i }));

        // Captura o argumento passado para setProducts
        const callArg = mockSetProducts.mock.calls[0][0];
        const newProducts = typeof callArg === 'function' ? callArg([]) : callArg;

        expect(newProducts).toEqual(
            expect.arrayContaining([
            expect.objectContaining({
                name: 'Produto Teste',
                price: 50,
                category: 'Cat 1',
                description: 'Descrição teste'
            })
            ])
        );

        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    test('botão cancelar apenas navega para "/"', () => {
        renderComponent();

        fireEvent.click(screen.getByRole('button', { name: /cancelar/i }));
        expect(mockNavigate).toHaveBeenCalledWith('/');
        expect(mockSetProducts).not.toHaveBeenCalled();
    });
});