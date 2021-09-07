import React, {useEffect} from 'react'
import {getProductsSelector, removeProduct, fetchAsyncProducts, isPending} from "./products.slice";
import {useAppDispatch, useAppSelector} from "../store.hooks";
import Counter from "./Counter";
import Loader from "./Loader";

interface ProductsListProps {

}

const ProductsList: React.FC<ProductsListProps> = () => {

    const dispatch = useAppDispatch()

    const products = useAppSelector(getProductsSelector)
    const isLoading = useAppSelector(isPending)

    const handleClick = (id:string) => () => {
        dispatch(removeProduct(id))
    }

    useEffect(() => {
        dispatch(fetchAsyncProducts())
    }, []);


    return (
        <div>
            <div>Games List</div>
            <div>{isLoading ? <Loader/> :  products.map(product => <div key={product.id}>
                    <div>{product.name}</div>
                    <div>{product.price}</div>
                    <Counter qty={product.qty} id={product.id}/>
                    <button onClick={handleClick(product.id)}>Удалить</button>
                </div>)
            }</div>
        </div>
    )
}

export default ProductsList