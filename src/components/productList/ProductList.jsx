import React, { useCallback, useEffect, useState } from 'react';
import './ProductList.css'
import ProductItem from '../productItem/ProductItem';
import { useTelegram } from '../../hooks/useTelegram';

const products = [
  {id: '1', title: 'Джинцы', price: 4999, description: 'Синего цвета'},
  {id: '2', title: 'Джинцы', price: 2499, description: 'Черного цвета'},
  {id: '3', title: 'Джинцы', price: 5299, description: 'Зеленого цвета'},
  {id: '4', title: 'Джинцы', price: 4999, description: 'Синего цвета'},
  {id: '5', title: 'Джинцы', price: 2499, description: 'Черного цвета'},
  {id: '6', title: 'Джинцы', price: 5299, description: 'Зеленого цвета'}

]

const getTotalPrice = (items = []) => {
  return items.reduce((acc, item) => {
    return acc += item.price
  }, 0)
}

const ProductList = () => {

  const [addedItems, setAddedItems] = useState([]);
  const {tg} = useTelegram();
  const [btnText, setBntText] = useState('Добавить в корзину')

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
        text: `Купить ${getTotalPrice(newItems)}`
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
