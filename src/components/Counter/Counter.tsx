import React from 'react';
import {useAppDispatch} from "../../store/store.hooks";
import { incrementProduct, decrementProduct } from '../Products/products.slice';
import "./Counter.scss"

interface ICounter {
    id: string
    qty: number
}

const Counter: React.FC<ICounter> = ({id, qty}) => {

    const dispatch = useAppDispatch()

    const handleIncrement = (id:string) => () => {
        dispatch(incrementProduct(id))
    }
    const handleDecrement = (id:string) => () => {
        dispatch(decrementProduct(id))
    }

    return (
        <div className="counter">
            <button className="counter__btn" onClick={handleIncrement(id)}>+</button><div className="counter__amount">{qty}</div><button className="counter__btn" onClick={handleDecrement(id)}>-</button>
        </div>
    );
};

export default Counter;
