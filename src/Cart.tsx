import React from 'react';
import ProductsList from "./Products/ProductsList";
import ProductForm from "./Products/ProductForm";
import Summary from "./Products/Summary";
import "./Cart.scss"

const Cart: React.FC = () => {

    return (
        <div className="cart">
            <ProductForm/>
            <ProductsList/>
            <Summary/>
        </div>
    );
};

export default Cart;
