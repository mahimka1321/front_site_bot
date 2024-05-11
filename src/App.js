import {useEffect } from 'react';
import  {useTelegram}  from './hooks/useTelegram';

import Header from './components/header/Header';

import './App.css';

function App() {

  const {tg, onToggelButton} = useTelegram();

  useEffect( () => {
    tg.ready();
  }, [tg])


  return (
    <div className="App">
      <Header/>
      <button onClick={onToggelButton}>toggle</button>
    </div>
  );
};

export default App;
