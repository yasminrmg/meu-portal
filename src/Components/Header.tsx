import React from "react";
import "./Header.css";
import Button from '../Components/Button';
import { useState } from 'react'; 


type HeaderProps = {
    onSearch: (searchTerm: string) => void;
}



function Header({onSearch}: HeaderProps) {
    const [searchId, setSearchId] = useState('');

    const searchProduct = ()=>{
        onSearch(searchId);
    } 

  return (
    <header className="Header">
      <nav>
        <div className="Logo">
            <img src="/logo192.png" alt="Logo" />
        </div>
        <div className="ContentHeader">
            <div className='search-bar'>
                <label aria-label='Produto'>Produto</label>
                <input type='text' placeholder='Digite o nome do produto' value={searchId} onChange={(e) => setSearchId(e.target.value)}/>
                <Button text="Pesquisar" buttonType='pesquisar' onClick={searchProduct}/>
            </div>
        </div>      
      </nav>
    </header>
  );
}

export default Header;