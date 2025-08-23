import "./Header.css";
import Button from '../Components/Button';
import React,{ useState, useEffect } from 'react'; 

type HeaderProps = {
    onSearch: (searchTerm: string) => void;
}

function Header({onSearch}: HeaderProps) {
    const [searchId, setSearchId] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(searchId);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchId, onSearch]);

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
            </div>
        </div>      
      </nav>
    </header>
  );
}

export default Header;