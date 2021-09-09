import React from 'react';
import {useAppSelector} from "../../store/store.hooks";
import {getTotalAmount, getTotalPrice} from "../Products/products.slice";
import "./Summary.scss"

const Summary = () => {

    const totalPrice = useAppSelector(getTotalPrice)
    const totalAmount = useAppSelector(getTotalAmount)

    return (
        <div className="summary">
            <div className="summary__total-price">Общая стоимость: <span>{totalPrice}</span></div>
            <div className="summary__total-count">Общее кол-во: <span>{totalAmount}</span></div>
            <button className="summary__checkout-btn">Оформить заказ</button>
        </div>
    );
};

export default Summary;
