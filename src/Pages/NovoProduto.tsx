import React, { useState } from "react";
import Button from "../Components/Button";
import "./NovoProduto.css";
import { useNavigate, useLocation } from "react-router-dom";

function NovoProduto() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [pictureUrl, setPictureUrl] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const criarProduto = (e: React.FormEvent) => {
        e.preventDefault();
        const novoProduto = { id: Date.now(), name, price: parseFloat(price), category, description, pictureUrl: pictureUrl || "/logo192.png" };

        navigate("/", { state: { novoProduto: novoProduto } });
    };


    const cancelar = () => {
        navigate("/");
    };

    return (
        <div className="novo-produto">
            <h2>Cadastrar Novo Produto</h2>
            <div className="formProduto-container">
                <form onSubmit={criarProduto} className="form-produto">
                    <label>Nome</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>

                    <label>Preço</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required/>

                    <label>Categoria</label>
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required/>

                    <label>Descrição</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required/>

                    <label>URL da Imagem</label>
                    <input type="text" value={pictureUrl} onChange={(e) => setPictureUrl(e.target.value)} />

                    <div className="button-actions">
                        <Button text="Salvar Produto" buttonType="salvar" type="submit"/>
                        <Button text="Cancelar" buttonType="cancelar" onClick={cancelar}/>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NovoProduto;