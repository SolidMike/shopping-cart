import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";
import {fetchProducts, validateProduct} from "../fake.api";

export interface IProduct {
    id: string,
    name: string,
    price: number,
    qty: number
}

export enum ValidationState {
    Fulfilled,
    Pending,
    Rejected
}

interface IProductsSliceState {
    products: IProduct[],
    validationState?: ValidationState,
    errorMessage?: string,
}

export const fetchAsyncProducts = createAsyncThunk(
    'products/fetchAsyncProducts',
    async () => {
        return await fetchProducts(initialProducts)
    }
)

export const addAsyncProduct = createAsyncThunk(
    'products/addAsyncProduct',
    async (newProduct:IProduct) => {
        return await validateProduct(newProduct)
    }
)

const initialProducts: IProduct[] = [
    {id: '1', name: 'Witcher', price: 50, qty: 1},
    {id: '2', name: 'Heroes', price: 40, qty: 2},
    {id: '3', name: 'Morrowind', price: 60, qty: 3},
]

const initialState: IProductsSliceState = {
    products: [],
    validationState: undefined,
    errorMessage: undefined,
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<IProduct>) => {
            const productIndex = state.products.findIndex(product => product.id === action.payload.id)
            if(productIndex !== -1) {
                state.products[productIndex].qty += 1
                state.products[productIndex].price += +action.payload.price
            } else {
                //Мы можем так делать, потому что redux-toolkit использует Immer
                state.products.push(action.payload)
                //state.total_price += +action.payload.price
            }
        },
        removeProduct: (state, action: PayloadAction<IProduct["id"]>) => ({
            ...state,
            products: state.products.filter(product => product.id !== action.payload)
        }),
        incrementProduct: (state, action:PayloadAction<string>) => {
            const productIndex = state.products.findIndex(product => product.id === action.payload)
            if(productIndex !== -1) {
                state.products[productIndex].qty += 1
            }
        },
        decrementProduct: (state, action:PayloadAction<string>) => {
            const productIndex = state.products.findIndex(product => product.id === action.payload)
            if(productIndex !== -1) {
                state.products[productIndex].qty = Math.max(0, state.products[productIndex].qty - 1)
            }
        },

    },
    extraReducers: builder => {
        builder.addCase(addAsyncProduct.fulfilled, (state, action) => {
            const productIndex = state.products.findIndex(product => product.id === action.payload.id)
            return {
                ...state,
                validationState: ValidationState.Fulfilled,
                errorMessage: undefined,
                products: productIndex !== -1
                    ? state.products.map(item => {
                            if (item.id === action.payload.id) {
                                return {
                                    ...item,
                                    ...action.payload,
                                    qty: item.qty + +action.payload.qty
                                }
                            }
                            return item
                        })
                    : [...state.products, { ...action.payload, qty: +action.payload.qty, price: +action.payload.price}]
            }
        })
        builder.addCase(addAsyncProduct.rejected, (state, action) => ({
            ...state,
            validationState: ValidationState.Rejected,
            errorMessage: action.error.message,
        }))
        builder.addCase(addAsyncProduct.pending, (state, action) => ({
            ...state,
            validationState: ValidationState.Pending,
            errorMessage: undefined,
        }))
        builder.addCase(fetchAsyncProducts.fulfilled, (state, action) => ({
            ...state,
            validationState: ValidationState.Fulfilled,
            errorMessage: undefined,
            products: [...action.payload]
        }))
        builder.addCase(fetchAsyncProducts.rejected, (state, action) => ({
            ...state,
            validationState: ValidationState.Rejected,
            errorMessage: action.error.message,
        }))
        builder.addCase(fetchAsyncProducts.pending, (state, action) => ({
            ...state,
            validationState: ValidationState.Pending,
            errorMessage: undefined,
        }))
    }
})

export const {addProduct, removeProduct, incrementProduct, decrementProduct} = productsSlice.actions

export const getProductsSelector = (state: RootState) => state.products.products
export const getTotalPrice = (state: RootState) => state.products.products.reduce((acc, next) => acc += (next.qty * next.price), 0)
export const getTotalAmount = (state: RootState) => state.products.products.reduce((acc, next) => acc += next.qty, 0)
export const getErrorMessage = (state: RootState) => state.products.errorMessage
export const isPending = (state: RootState) => (state.products.validationState === ValidationState.Pending)

export default productsSlice.reducer