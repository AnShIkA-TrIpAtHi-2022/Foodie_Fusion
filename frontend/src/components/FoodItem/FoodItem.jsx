import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ image, name, price, desc, id }) => {
    if (!id) {
        console.error('FoodItem component received an undefined or invalid id:', id);
        return null; // Render nothing if id is invalid
    }

    const { cartItems, addToCart, removeFromCart, url, currency } = useContext(StoreContext);
    const itemCountInCart = cartItems?.[id] || 0; // Safely access cartItems[id]

    return (
        <div className='food-item'>
            <div className='food-item-img-container'>
                <img className='food-item-image' src={url + "/uploads/" + image} alt="" />
                {itemCountInCart > 0 ? (
                    <div className="food-item-counter">
                        <img src={assets.remove_icon_red} onClick={() => removeFromCart(id)} alt="" />
                        <p>{itemCountInCart}</p>
                        <img src={assets.add_icon_green} onClick={() => id && addToCart(id)} alt="" />
                    </div>
                ) : (
                    <img className='add' onClick={() => id && addToCart(id)} src={assets.add_icon_white} alt="" />
                )}
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p> <img src={assets.rating_starts} alt="" />
                </div>
                <p className="food-item-desc">{desc}</p>
                <p className="food-item-price">{currency}{price}</p>
            </div>
        </div>
    );
};

export default FoodItem;
