import React, { useState } from 'react';
import './ProductList.css'
import ProductItem from '../productItem/ProductItem';
import { useTelegram } from '../../hooks/useTelegram';

const products = [
  {id: '1', title: 'Джинцы', price: 4999, description: 'Синего цвета'},
  {id: '2', title: 'Джинцы', price: 2499, description: 'Черного цвета'},
  {id: '3', title: 'Джинцы', price: 5299, description: 'Зеленого цвета'},

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
  const onAdd = (product) => {
    const alreadyAdded = addedItems.find(item => item.id === product.id);
    let newItems = [];

    if(alreadyAdded) {
      newItems = addedItems.filter(item => item.id !== product.id);
      setBntText('Удалить')
    } else {
      newItems = [...addedItems, product];
      setBntText('Удалить')
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
    <div className={'list'}>
      {products.map(item => (
        <ProductItem
          product={item}
          onAdd={onAdd}
          className={'item'}
          setBntText={setBntText}
          btnText={btnText}
          />
      ))}
    </div>
  );
};

export default ProductList;
