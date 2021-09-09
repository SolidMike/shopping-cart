import React from 'react';
import ProductsList from "../Products/ProductsList";
import ProductForm from "../Products/ProductForm";
import Summary from "../Summary/Summary";
import "./Cart.scss"

const Cart: React.FC = () => {

    return (
        <div className="cart">
            <div className="cart__header">Корзина</div>
            <div className="cart__body">
                <ProductsList/>
            </div>
            <div className="cart__footer">
                <ProductForm/>
                <Summary/>
            </div>
        </div>
    );
};

export default Cart;
