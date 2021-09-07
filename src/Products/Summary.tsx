import React from 'react';
import {useAppSelector} from "../store.hooks";
import {getTotalAmount, getTotalPrice} from "./products.slice";

const Symmary = () => {

    const totalPrice = useAppSelector(getTotalPrice)
    const totalAmount = useAppSelector(getTotalAmount)

    return (
        <div>
            <h5>{totalPrice}</h5>
            <h5>{totalAmount}</h5>
        </div>
    );
};

export default Symmary;
