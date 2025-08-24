import axios from "axios";
import { Product } from "./ProductsContext";

const API_URL = "http://localhost:3001/api/product"; // sua API

export async function fetchProducts(): Promise<Product[]> {
    const res = await axios.get(API_URL);
    return res.data;
}

export async function deleteProductApi(id: number): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
}

export async function updateProductApi(id: number, updated: Partial<Product>): Promise<Product> {
    const res = await axios.put(`${API_URL}/${id}`, updated);
    return res.data;
}

export async function createProductApi(newProduct: Omit<Product, 'id'>): Promise<Product> {
    const res = await axios.post(API_URL, newProduct);
    return res.data;
}