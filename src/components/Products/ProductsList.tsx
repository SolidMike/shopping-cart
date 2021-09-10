import React, {useEffect} from 'react'
import {getProductsSelector, removeProduct, fetchAsyncProducts, isPending} from "./products.slice";
import {useAppDispatch, useAppSelector} from "../../store/store.hooks";
import Counter from "../Counter/Counter";
import Loader from "../Loader/Loader";
import "./ProductsList.scss"

interface ProductsListProps {

}

const ProductsList: React.FC<ProductsListProps> = () => {

    const dispatch = useAppDispatch()

    const products = useAppSelector(getProductsSelector)
    const isLoading = useAppSelector(isPending)

    const handleClick = (id: string) => () => {
        dispatch(removeProduct(id))
    }

    useEffect(() => {
        dispatch(fetchAsyncProducts())
    }, [dispatch]);


    return (
        <div className="products-list">
            {isLoading ? <Loader/> : products.map(product => <div key={product.id} className="products-list__item"
                                                                  data-testid="product-element">
                <div className="products-list__first-half">
                    <img className="products-list__img products-list__img--bg--triangle" src={product.img}
                         alt={product.name}/>
                    <div className="products-list__name" data-testid="product-name">{product.name}</div>
                </div>
                <div className="products-list__second-half">
                    <div className="products-list__price">{product.price} ₽</div>
                    <Counter qty={product.qty} id={product.id}/>
                    <div className="products-list__delete">
                        <button className="products-list__btn" onClick={handleClick(product.id)}
                                data-testid="removeItem">&#10006;
                        </button>
                    </div>
                </div>
            </div>)
            }
        </div>
    )
}

export default ProductsList