// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import './ProductDisplay.css';
import { StoreContext } from '../../../context/StoreContext';
import ProductItem from '../ProductItem/ProductItem';

// eslint-disable-next-line react/prop-types, no-unused-vars
const ProductDisplay = ({ category }) => {
    const { product_list } = useContext(StoreContext);

    return (
        <div className='product-display' id='product-display'>
            <h2>Top Products in various categories</h2>
            <div className='product-display-list'>
                {product_list.map((item, index) => {
                    if(category === "All" || category === item.category) {
                        return (
                            <ProductItem
                                key={index} 
                                id={item._id} 
                                name={item.name} 
                                description={item.description} 
                                price={item.price} 
                                image={item.image} 
                            />
                        );
                    }
                    return null; // or handle else case if needed
                })}
            </div>
        </div>
    );
}

export default ProductDisplay;
