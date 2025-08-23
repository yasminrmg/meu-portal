import Button from '../Components/Button';
import Card from '../Components/Card';
import './Home.css';
import { useOutletContext, useNavigate } from 'react-router';
import { useProducts } from '../ProductsContext';
import { useEffect, useMemo, useState } from 'react';

type ContextType = {
    searchTerm: string;
};


function Home(){
    const { products } = useProducts();
    const { searchTerm } = useOutletContext<ContextType>();
    const navigate = useNavigate();

    const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);


    const filteredProducts = useMemo (() => {
        const term = debouncedSearch.toLocaleLowerCase();

        return products.filter((p) =>{
            const nameMatches = p.name.toLowerCase().includes(term);
            const idMatches = p.id.toString().includes(term);
            return nameMatches || idMatches;
        });
    }, [products, debouncedSearch]);

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