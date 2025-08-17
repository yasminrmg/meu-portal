import Button from '../Components/Button';
import products from '../Data/data.json';
import Card from '../Components/Card';
import './Home.css';
import { useState } from 'react';   


function Home(){

    const [filteredProducts, setFilteredProducts] = useState(products);
    const [searchId, setSearchId] = useState('');

    function searchProduct(){
        const filtered = products.filter((product) => product.id.toString().includes(searchId));
        setFilteredProducts(filtered);
    }


    return(
        <div className='home'>
            <div className='search-bar'>
                <label aria-label='Produto'>Produto</label>
                <input type='text' placeholder='Digite o nome do produto' value={searchId} onChange={(e) => setSearchId(e.target.value)}/>
                <Button text="Pesquisar" buttonType='pesquisar' onClick={searchProduct}/>
            </div>
            
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