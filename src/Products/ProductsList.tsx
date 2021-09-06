import React from 'react'
import {useSelector} from "react-redux";
import {getProductsSelector, removeProduct} from "./products.slice";
import {useAppDispatch} from "../store.hooks";
import Counter from "./Counter";

interface ProductsListProps {

}

const ProductsList: React.FC<ProductsListProps> = ({}) => {

    const dispatch = useAppDispatch()

    const products = useSelector(getProductsSelector)

    const handleClick = (id:string) => () => {
        dispatch(removeProduct(id))
    }
    return (
        <div>
            <div>Games List</div>
            {products.map(product => <div key={product.id}>
                <div>{product.name}</div>
                <div>{product.price}</div>
                <Counter qty={product.qty} id={product.id}/>
                <button onClick={handleClick(product.id)}>Удалить</button>
            </div>)}

            <button >Добавить товар</button>
        </div>
    )
}

export default ProductsList