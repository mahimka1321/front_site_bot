import React from 'react';

import './ProductItem.css';

import Button from '../button/Button';


const ProductItem = ({product, className, onAdd, btnText}) => {

    const onAddHandler = () => {
        onAdd(product)
    }



  return (
    <div className={'product ' + className}>
        <img className={'img'} src={product.imgUrl} alt="" />
        <div className={'title'}>{product.title}<span className={'description'}> / {product.description}</span></div>
        <div className={'container_information-total'}> <p className={'__star'}>★ <span className={'__star_info'}>4.5</span></p> <span className={'__info_shops_item'}> <samp>·</samp>432 оценка</span></div>
        <Button className={'add-btn'} onClick={onAddHandler}>
            {btnText}
        </Button>
    </div>
  );
};

export default ProductItem;
