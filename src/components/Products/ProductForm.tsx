import React, {useState} from 'react';
import {IProduct, addAsyncProduct, getErrorMessage} from "./products.slice";
import {useAppDispatch} from "../../store/store.hooks";
import {useSelector} from "react-redux";
import "./ProductForm.scss"

const ProductForm: React.FC = () => {

    const dispatch = useAppDispatch()
    const errorMessage = useSelector(getErrorMessage)

    const [{id, name, price, qty, img}, setProduct] = useState<IProduct>({
        id: '',
        name: '',
        price: 0,
        qty: 1,
        img: ''
    })

    const handleChange = ({target: {name, value}}: React.ChangeEvent<HTMLInputElement>) => setProduct(prev => {
        (prev as any)[name] = value
        const newValue = {...prev}
        return newValue
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(addAsyncProduct({id, name, price, qty, img}))
    }
    return (
        <div className="product-form">
            <h2 className="product-form__title">Добавить игру в корзину</h2>
            {errorMessage && <span>{errorMessage}</span>}
            <form className="product-form__form" onSubmit={handleSubmit}>

                <label className="product-form__label" htmlFor="name">Название:
                    <input className="product-form__input input"
                           style={{border: errorMessage ? '1px solid #f00' : '1px solid #000'}} id="name" type="text"
                           placeholder="Название" name="name" value={name} onChange={handleChange}/>
                </label>

                <label className="product-form__label" htmlFor="price">Стоимость:
                    <input className="product-form__input input"
                           style={{border: errorMessage ? '1px solid #f00' : '1px solid #000'}} id="price" type="number"
                           placeholder="Стоимость" name="price" value={price} onChange={handleChange}/>
                </label>

                <label className="product-form__label" htmlFor="qty">Количество:
                    <input className="product-form__input input"
                           style={{border: errorMessage ? '1px solid #f00' : '1px solid #000'}} id="qty" type="number"
                           placeholder="Количество" name="qty" value={qty} onChange={handleChange}/>
                </label>
                <button className="product-form__btn btn" type="submit">Добавить игру</button>
            </form>
        </div>
    );
};

export default ProductForm;
