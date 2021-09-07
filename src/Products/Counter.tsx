import React from 'react';
import {useAppDispatch} from "../store.hooks";
import { incrementProduct, decrementProduct } from './products.slice';

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
        <div>
            <button onClick={handleIncrement(id)}>+</button><div>{qty}</div><button onClick={handleDecrement(id)}>-</button>
        </div>
    );
};

export default Counter;
