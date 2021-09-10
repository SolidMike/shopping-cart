import React, {useState} from 'react';
import {useAppSelector} from "../../store/store.hooks";
import {getTotalAmount, getTotalPrice} from "../Products/products.slice";
import "./Summary.scss"

const Summary = () => {

    const [policyChecked, setPolicyChecked] = useState(false)

    const totalPrice = useAppSelector(getTotalPrice)
    const totalAmount = useAppSelector(getTotalAmount)

    const handlePolicyCheck = () => {
        setPolicyChecked(!policyChecked)
    }

    return (
        <div className="summary">
            <div className="summary__total-price"><span>Сумма: </span> <span>{totalPrice} ₽</span></div>
            <div className="summary__total-count"><span className="summary__text summary__text--mobile--hidden">Общее кол-во: </span>
                <span className="summary__counter">{totalAmount}</span></div>
            <label htmlFor="policy">
                <input id="policy" className="summary__policy-check" type="checkbox" onChange={handlePolicyCheck}
                       checked={policyChecked}/>
                Я согласен с условиями.
            </label>

            <button className="summary__checkout-btn btn" disabled={!policyChecked}>Оформить заказ</button>
        </div>
    );
};

export default Summary;
