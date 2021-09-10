import {IProduct} from "../components/Products/products.slice";

export const fetchProducts = (products: IProduct[]): Promise<IProduct[]> => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (!products.length) reject('В корзине нет товаров')
        resolve(products)
    }, 2000)
})

export const validateProduct = (product: IProduct): Promise<IProduct> => new Promise((resolve, reject) => setTimeout(() => {
    if (product.name.length === 0) {
        reject('Вы не указали название')
    }
    if (product.price <= 0) {
        reject('Вы указали некорректную цену')
    }
    resolve(product)
}, 2000))