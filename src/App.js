import React, {useEffect } from 'react';
import  {useTelegram}  from './hooks/useTelegram';

import Header from './components/header/Header';

import { Route, Routes } from 'react-router-dom';

import './App.css';
import ProductList from './components/productList/ProductList';
import Form from './components/form/Form';



function App() {

  const {tg} = useTelegram();



  useEffect( () => {
    tg.ready();
  }, [tg])


  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route index element={<ProductList/>}/>
        <Route path={'form'} element={<Form/>}/>
      </Routes>
    </div>
  );
};

export default App;
