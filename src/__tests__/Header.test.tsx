import { render, screen, act } from "@testing-library/react";
import Header from "../Components/Header";
import '@testing-library/jest-dom';

test("deve renderizar logo e input", () => {
    render(<Header onSearch={() => {}} />);

    expect(
        screen.getByPlaceholderText("Digite o nome do produto")
    ).toBeInTheDocument();
});