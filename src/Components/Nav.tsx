import React from "react";
import "./Nav.css";
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="Nav">
      <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
        Home
      </NavLink>

      <NavLink to="/novoProduto" className={({ isActive }) => (isActive ? "active" : "")}>
        Novo Produto
      </NavLink>

      <NavLink to="/uploadProdutos" className={({ isActive }) => (isActive ? "active" : "")}>
        Upload Produtos
      </NavLink>
    </nav>
  );
}

export default Nav;