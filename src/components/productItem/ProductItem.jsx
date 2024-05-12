import React from 'react';

import './ProductItem.css';




const ProductItem = ({product, className, onAdd}) => {

    const onAddHandler = () => {
        onAdd(product)
    }

  return (
    <div className={'product'}>
        <div className={'img'}/>
        <div className={'title'}>{product.title}</div>
        <div className={'description'}>{product.description}</div>
        <div className={'price'}>
            <span>Стоимость: <b>{product.price}</b></span>
        </div>
        <button className={'add-btn'} onClick={onAddHandler}>
            Добавить в корзину
        </button>
    </div>
  );
};

export default ProductItem;
