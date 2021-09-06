import React, {useState} from 'react';
import {IProduct, addProduct} from "./products.slice";
import {useAppDispatch} from "../store.hooks";

const ProductForm: React.FC = ({}) => {

    const dispatch = useAppDispatch()

    const [product, setProduct] = useState<IProduct>({
        id: '',
        name: '',
        price: 0,
        qty: 0
    })

    const handleChange = ({target: {name, value}}: React.ChangeEvent<HTMLInputElement>) => setProduct(prev => {
        (prev as any)[name] = value
        const newValue = {...prev}
        return newValue
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(addProduct(product))
    }
    const {id, name, price, qty} = product
    return (
        <>
            <h2>Добавить игру в корзину</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Название" name="name" value={name} onChange={handleChange}/>
                    <input type="number" placeholder="Стоимость" name="price" value={price} onChange={handleChange}/>
                    <input type="text" placeholder="id" name="id" value={id} onChange={handleChange}/>
                    <button type="submit">Добавить игру</button>
                </form>
            </div>
        </>
    );
};

export default ProductForm;
