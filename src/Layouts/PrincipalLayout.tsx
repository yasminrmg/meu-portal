import {Outlet} from 'react-router-dom';
import Header from '../Components/Header';
import Nav from '../Components/Nav';
import './PrincipalLayout.css';
import { useState } from 'react';

function PrincipalLayout(){
  const[searchTerm, setSearchTerm] = useState('');

  return (
    <div className="PrincipalLayout">
      <Header onSearch={setSearchTerm} />
      <div className='content'>
        <Nav />
        <main className='main'>
            <Outlet context={{ searchTerm }}/>
        </main>
      </div>
    </div>
  );
}
export default PrincipalLayout;