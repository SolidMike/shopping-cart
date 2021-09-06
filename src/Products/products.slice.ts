import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";

export interface IProduct {
    id: string,
    name: string,
    price: number,
    qty: number
}

export interface ICart {
    total_price: number,
    total_amount: number
}

const initialState: IProduct[] = [
    {id: '1', name: 'Witcher', price: 50, qty: 1},
    {id: '2', name: 'Heroes', price: 40, qty: 2},
    {id: '3', name: 'Morrowind', price: 60, qty: 3},
]

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<IProduct>) => {
            const productIndex = state.findIndex(product => product.id === action.payload.id)
            if(productIndex !== -1) {
                state[productIndex].qty += 1
                state[productIndex].price += +action.payload.price
            } else {
                //Мы можем так делать, потому что redux-toolkit использует Immer
                state.push(action.payload)
            }
        },
        removeProduct: (state, action: PayloadAction<IProduct["id"]>) => {
            return state.filter(product => product.id !== action.payload)
        },
        incrementProduct: (state, action:PayloadAction<string>) => {
            const productIndex = state.findIndex(product => product.id === action.payload)
            if(productIndex !== -1) {
                state[productIndex].qty += 1
                //state[productIndex].price += state[productIndex].price
            }
        },

    }
})

export const {addProduct, removeProduct, incrementProduct} = productsSlice.actions

export const getProductsSelector = (state: RootState) => state.products
export const getTotalPrice = (state: RootState) => state.products.reduce((acc, next) => acc += (next.qty * next.price), 0)

export default productsSlice.reducer