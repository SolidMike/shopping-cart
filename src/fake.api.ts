import {IProduct} from "./Products/products.slice";

export const fetchProducts = (products:IProduct[]): Promise<IProduct[]> => new Promise((resolve, reject) => {
    setTimeout(() => {
        if(!products.length) reject('В корзине нет товаров')
        resolve(products)
    }, 3000)
})

export const validateProduct = (product: IProduct): Promise<IProduct> => new Promise((resolve, reject) => setTimeout(() => {
    if(product.name.length === 0) {
        reject('Нет названия')
    }
    if(product.price <= 0) {
        reject('Некорректная цена')
    }
    resolve(product)
}, 2000))