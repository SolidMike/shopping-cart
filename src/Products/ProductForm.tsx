import React, {useState} from 'react';
import {IProduct, addAsyncProduct, getErrorMessage} from "./products.slice";
import {useAppDispatch} from "../store.hooks";
import {useSelector} from "react-redux";
import "./ProductForm.scss"

const ProductForm: React.FC = () => {

    const dispatch = useAppDispatch()
    const errorMessage = useSelector(getErrorMessage)

    const [{id, name, price, qty}, setProduct] = useState<IProduct>({
        id: '',
        name: '',
        price: 0,
        qty: 1
    })

    const handleChange = ({target: {name, value}}: React.ChangeEvent<HTMLInputElement>) => setProduct(prev => {
        (prev as any)[name] = value
        const newValue = {...prev}
        return newValue
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(addAsyncProduct({id, name, price, qty}))
    }
    return (
        <div className="product-form">
            <h2 className="product-form__title">Добавить игру в корзину</h2>
            {errorMessage && <span>{errorMessage}</span>}
            <form className="product-form__form" onSubmit={handleSubmit}>
                <input className="product-form__input input" style={{border: errorMessage ? '1px solid #f00' : '1px solid #000'}} type="text" placeholder="Название" name="name" value={name} onChange={handleChange}/>
                <input className="product-form__input input" style={{border: errorMessage ? '1px solid #f00' : '1px solid #000'}} type="number" placeholder="Стоимость" name="price" value={price} onChange={handleChange}/>
                <input className="product-form__input input" style={{border: errorMessage ? '1px solid #f00' : '1px solid #000'}} type="number" placeholder="Количество" name="qty" value={qty} onChange={handleChange}/>
                <input className="product-form__input input" style={{border: errorMessage ? '1px solid #f00' : '1px solid #000'}} type="text" placeholder="id" name="id" value={id} onChange={handleChange}/>
                <button className="product-form__btn btn" type="submit">Добавить игру</button>
            </form>
        </div>
    );
};

export default ProductForm;
