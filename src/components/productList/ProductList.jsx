import React, { useCallback, useEffect, useState } from 'react';
import './ProductList.css'
import ProductItem from '../productItem/ProductItem';
import { useTelegram } from '../../hooks/useTelegram';

const products = [
  {id: '1', imgUrl:'https://a.radikalfoto.host/2024/05/18/vI2fJxnCKAY.jpeg', title: 'Романтичная история', price: 4999, description: ''},
  {id: '2', imgUrl:'https://a.radikalfoto.host/2024/05/18/iEW-UaXAOEY.jpeg', title: 'Дринцесса для...', price: 2499, description: 'Книга...'},
  {id: '3', imgUrl:'https://a.radikalfoto.host/2024/05/18/tKeV70UFl-0.jpeg', title: 'Загадочная история', price: 5299, description: ''},
  {id: '4', imgUrl:'https://a.radikalfoto.host/2024/05/18/HXbXPg7iZqw.jpeg', title: 'Подарю тебе любовь', price: 4999, description: ''},
  {id: '5', imgUrl:'https://a.radikalfoto.host/2024/05/18/bJU4LHsnp30.jpeg', title: 'Невероятная история', price: 2499, description: ''},
  {id: '6', imgUrl:'https://a.radikalfoto.host/2024/05/18/ZpxP68tc5OE.jpeg', title: 'Романтическое назв...', price: 5299, description: ''}

]

const getTotalPrice = (items = []) => {
  return items.reduce((acc, item) => {
    return acc += item.price
  }, 0)
}

const ProductList = () => {

  const [addedItems, setAddedItems] = useState([]);
  const {tg} = useTelegram();
  const [btnText, setBntText] = useState('Скачать')

  const onSendData = useCallback(()=> {
    const data = {
      products: addedItems,
      getTotalPrice: getTotalPrice(addedItems)
    }
    fetch('http://localhost:8000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
},[addedItems])

useEffect(()=>{
    tg.onEvent('mainButtonClicked', onSendData)

    return () => {
        tg.offEvent('mainButtonClicked', onSendData)
    }
},[tg, onSendData])

  const onAdd = (product) => {
    const alreadyAdded = addedItems.find(item => item.id === product.id);
    let newItems = [];

    if(alreadyAdded) {
      newItems = addedItems.filter(item => item.id !== product.id);
    } else {
      newItems = [...addedItems, product];
    }

    setAddedItems(newItems);

    if(newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Купить ${getTotalPrice(newItems)} ₽`
      })
    }
  }

  return (
    <div className={'-container_product'}>
      <div className={'container__otlad'}>
      <div className={'list auto-fill'}>
      {products.map(item => (
        <ProductItem
          product={item}
          onAdd={onAdd}
          className={'item'}
          btnText={btnText}
          setBntText={setBntText}
          />
      ))}
    </div>
      </div>
    </div>
  );
};

export default ProductList;
