import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import PrincipalLayout from "../Layouts/PrincipalLayout";

test("renderiza Header, Nav e Outlet", () => {
    render(
        <MemoryRouter>
        <PrincipalLayout />
        </MemoryRouter>
    );
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Novo Produto/i)).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/Digite o nome do produto/i)).toBeInTheDocument();

    expect(screen.getByRole('main')).toBeInTheDocument();
});