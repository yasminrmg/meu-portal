import Button from '../Components/Button';
import Card from '../Components/Card';
import './Home.css';
import { useState, useEffect } from 'react'; 
import { useLoaderData, useOutletContext, useNavigate } from 'react-router-dom';



type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    pictureUrl: string;
};

type ContextType = {
    searchTerm: string;
};


export async function productsLoader(){
    const response = await fetch("/data/data.json");
    const products = await response.json();
    return products;
}

function Home(){
    const products = useLoaderData() as Product[];
    const {searchTerm} = useOutletContext<ContextType>();

    const [filteredProducts, setFilteredProducts] = useState(products);
    const navigate = useNavigate();

    //const [searchId, setSearchId] = useState('');

    useEffect(() => {
        const filtered = products.filter((product) => product.id.toString().includes(searchTerm));
        setFilteredProducts(filtered);
    },[searchTerm, products]); 


    return(
        <div className='home'>
            <Button text="Cadastrar novo Produto" buttonType="deletar" onClick={() => navigate("/novoProduto")} />
            <div className='products'>
                {filteredProducts.map((product) => (
                    <Card
                        key={product.id}
                        title={`(${product.id}) ${product.name}`} 
                        img={product.pictureUrl} >
                            <p className='product-category'>{product.category}</p>
                            <p className='product-price'>R$ {product.price.toFixed(2)}</p>
                            <div className='button-action'>
                                <Button text="Editar" buttonType="editar"/>
                                <Button text="Excluir" buttonType="deletar"/>
                            </div>
                    </Card>
                ))}
            </div>
        </div>
    );     
}

export default Home;