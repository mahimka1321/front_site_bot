import React from 'react';

import './ProductItem.css';

import Button from '../button/Button';


const ProductItem = ({product, className, onAdd, btnText}) => {

    const onAddHandler = () => {
        onAdd(product)
    }

  return (
    <div className={'product ' + className}>
        <div className={'img'}/>
        <div className={'price'}>
            <span>{product.price} ₽</span>
        </div>
        <div className={'title'}>{product.title}</div>
        <div className={'description'}>{product.description}</div>
        <Button className={'add-btn'} onClick={onAddHandler}>
            {btnText}
        </Button>
    </div>
  );
};

export default ProductItem;
