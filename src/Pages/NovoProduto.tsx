import React, { useState } from "react";
import Button from "../Components/Button";
import "./NovoProduto.css";

function NovoProduto() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [pictureUrl, setPictureUrl] = useState("");

    const criarProduto = (e: React.FormEvent) => {
        e.preventDefault();
        const novoProduto = { name, price, category, description, pictureUrl };
        console.log("Novo produto cadastrado:", novoProduto);
        // depois você pode salvar no JSON ou API
    };

    return (
        <div className="novo-produto">
            <h2>Cadastrar Novo Produto</h2>
            <div className="formProduto-container">
                <form onSubmit={criarProduto} className="form-produto">
                    <label>Nome</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                    <label>Preço</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

                    <label>Categoria</label>
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />

                    <label>Descrição</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

                    <label>URL da Imagem</label>
                    <input type="text" value={pictureUrl} onChange={(e) => setPictureUrl(e.target.value)} />

                    <div className="button-actions">
                        <Button text="Salvar Produto" buttonType="salvar" />
                        <Button text="Cancelar" buttonType="cancelar" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NovoProduto;