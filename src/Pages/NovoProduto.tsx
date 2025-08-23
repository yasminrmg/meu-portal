import React, { useState } from "react";
import Button from "../Components/Button";
import "./NovoProduto.css";
import { useNavigate } from "react-router";
import { useProducts } from '../ProductsContext';

function NovoProduto() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [pictureUrl, setPictureUrl] = useState("");

    const [errors, setErrors] = useState({
        name: "",
        price: "",
        category: "",
        description: ""
    });

    const validarForm = () => {
        const newErrors: typeof errors = { name: "", price: "", category: "", description: "" };
        let valido = true;

        if (!name.trim()) {
            newErrors.name = "Nome é obrigatório";
            valido = false;
        }
        if (!price.trim() || parseFloat(price) <= 0) {
            newErrors.price = "Preço deve ser maior que zero";
            valido = false;
        }
        if (!category.trim()) {
            newErrors.category = "Categoria é obrigatória";
            valido = false;
        }
        if (!description.trim()) {
            newErrors.description = "Descrição é obrigatória";
            valido = false;
        }

        setErrors(newErrors);
        return valido;
    };

    
    const navigate = useNavigate();
    const { products, setProducts } = useProducts();

    const criarProduto = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validarForm()) return;
        
        const novoProduto = { id: Date.now(), name, price: parseFloat(price), category, description, pictureUrl: pictureUrl || "/logo192.png" };

        setProducts((prevProducts) => [...prevProducts, novoProduto]);
        navigate('/');
    };    


    return (
        <div className="novo-produto">
            <h2>Cadastrar Novo Produto</h2>
            <div className="formProduto-container">
                <form onSubmit={criarProduto} className="form-produto">
                    <label htmlFor="nome">Nome</label>
                    <input id="nome" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    {errors.name && <span className="error">{errors.name}</span>}

                    <label htmlFor="preco">Preço</label>
                    <input id="preco" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                    {errors.price && <span className="error">{errors.price}</span>}

                    <label htmlFor="categoria">Categoria</label>
                    <input id="categoria" type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                    {errors.category && <span className="error">{errors.category}</span>}

                    <label htmlFor="descricao">Descrição</label>
                    <textarea id="descricao" value={description} onChange={(e) => setDescription(e.target.value)} />
                    {errors.description && <span className="error">{errors.description}</span>}

                    <label htmlFor="pictureUrl">URL da Imagem</label>
                    <input id="pictureUrl" type="text" value={pictureUrl} onChange={(e) => setPictureUrl(e.target.value)} />

                    <div className="button-actions">
                        <Button text="Salvar Produto" buttonType="salvar" type="submit"/>
                        <Button text="Cancelar" buttonType="cancelar" onClick={() => navigate("/")}/>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NovoProduto;