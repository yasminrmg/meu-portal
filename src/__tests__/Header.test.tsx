import { render, screen, act, fireEvent } from "@testing-library/react";
import Header from "../Components/Header";
import '@testing-library/jest-dom';

test("deve renderizar logo e input", () => {
    render(<Header onSearch={() => {}} />);

    expect(
        screen.getByPlaceholderText("Digite o nome do produto")
    ).toBeInTheDocument();
});


test('usuário consegue digitar no input', () => {

    render (<Header onSearch={() => {}} />);
    const input = screen.getByPlaceholderText('Digite o nome do produto') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Produto A' } });
    expect(input.value).toBe('Produto A');
});

test('chama onSearch com o termo de busca após debounce', async () => {

    jest.useFakeTimers();
    const mockOnSearch = jest.fn();
    render(<Header onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText('Digite o nome do produto') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Produto A' } });

    act(() => {
        jest.advanceTimersByTime(500);
    });

    expect(mockOnSearch).toHaveBeenCalledWith('Produto A');

    jest.useRealTimers();
});
