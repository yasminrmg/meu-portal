import React, { useState } from "react";
import { useProducts, Product } from "../ProductsContext";
import Card from "../Components/Card";
import Button from "../Components/Button";
import './Home.css'; // reaproveitando o CSS da Home
import { useNavigate } from "react-router";

function UploadProdutos() {
    const { setProducts } = useProducts();
    const navigate = useNavigate();
    const [csvProducts, setCsvProducts] = useState<Product[]>([]);
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const [error, setError] = useState("");

    // Upload CSV
    const handleCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError("");
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.name.endsWith(".csv")) {
        setError("Arquivo deve ter extensão .csv");
        return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
        const text = event.target?.result as string;
        if (!text) return;

        try {
            const lines = text.split("\n").filter(Boolean);
            const headers = lines[0].split(",").map(h => h.trim());

            const newProducts = lines.slice(1).map((line, index) => {
            const values = line.split(",").map(v => v.trim());
            const product: any = {};
            headers.forEach((h, i) => {
                product[h] = values[i] || "";
            });

            return {
                id: Number(product.id) || Date.now() + index,
                name: product.name || "",
                description: product.description || "",
                price: parseFloat(product.price) || 0,
                category: product.category || "",
                pictureUrl: product.pictureUrl || "/logo192.png",
            } as Product;
            });

            setCsvProducts(newProducts);
        } catch {
            setError("Erro ao processar o CSV");
        }
        };

        reader.readAsText(file);
    };

    const toggleSelect = (id: number) => {
        const newSet = new Set(selectedIds);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        setSelectedIds(newSet);
    };

    const saveSelected = () => {
        const toSave = csvProducts.filter(p => selectedIds.has(p.id));
        if (toSave.length === 0) {
        setError("Selecione pelo menos um produto");
        return;
        }
        setProducts(prev => [...prev, ...toSave]);
        setCsvProducts([]);
        setSelectedIds(new Set());
        setError("");
        alert("Produtos salvos com sucesso!");

        navigate("/");
    };

    return (
        <div className='UploadProdutos'>
        <h2>Importar Produtos do CSV</h2>
        <label htmlFor="file">Upload de arquivo</label>
        <input id="file" type="file" accept=".csv" onChange={handleCSV} />
        {error && <p style={{ color: "red" }}>{error}</p>}

        {csvProducts.length > 0 && (
            <div className='products'>
            {csvProducts.map((product) => (
                <div key={product.id} style={{ position: "relative" }}>
                <Card title={`(${product.id}) ${product.name}`} img={product.pictureUrl}>
                    <p className='product-category'>{product.category}</p>
                    <p className='product-price'>R$ {product.price.toFixed(2)}</p>
                </Card>
                <label style={{ position: "absolute", top: 5, left: 5, background: 'white', padding: '2px 5px', borderRadius: '3px' }}>
                    <input
                    type="checkbox"
                    checked={selectedIds.has(product.id)}
                    onChange={() => toggleSelect(product.id)}
                    /> Selecionar
                </label>
                </div>
            ))}
            </div>
        )}

        {csvProducts.length > 0 && (
            <Button text="Salvar selecionados" buttonType="salvar" onClick={saveSelected} />
        )}
        </div>
    );
}

export default UploadProdutos;