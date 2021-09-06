import React from 'react';
import {useAppDispatch} from "../store.hooks";
import { incrementProduct } from './products.slice';

interface ICounter {
    id: string
    qty: number
}

const Counter: React.FC<ICounter> = ({id, qty}) => {

    const dispatch = useAppDispatch()

    const handleIncrement = (id:string) => () => {
        dispatch(incrementProduct(id))
    }

    return (
        <div>
            <button onClick={handleIncrement(id)}>+</button><div>{qty}</div><button>-</button>
        </div>
    );
};

export default Counter;
