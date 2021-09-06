import React from 'react';
import ProductsList from "./Products/ProductsList";
import ProductForm from "./Products/ProductForm";
import {useAppSelector} from "./store.hooks";
import {getTotalPrice} from "./Products/products.slice";

const Cart: React.FC = () => {

    const totalPrice = useAppSelector(getTotalPrice)
    return (
        <div>
            <h5>{totalPrice}</h5>
            <ProductsList/>
            <ProductForm/>
        </div>
    );
};

export default Cart;
