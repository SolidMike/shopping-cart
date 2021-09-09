import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../../store/store";
import {fetchProducts, validateProduct} from "../../api/fake.api";
import morrowind from "../../images/morrowind.png"
import witcher from "../../images/witcher.png"
import dummy from "../../images/dummy.png"

export interface IProduct {
    id: string,
    name: string,
    price: number,
    qty: number,
    img: string
}

export enum ValidationState {
    Fulfilled,
    Pending,
    Rejected
}

export interface IProductsSliceState {
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
    {id: '1', name: 'Witcher', price: 50, qty: 1, img: witcher},
    {id: '2', name: 'Heroes', price: 40, qty: 2, img: dummy},
    {id: '3', name: 'Morrowind', price: 60, qty: 3, img: morrowind},
]

const initialState: IProductsSliceState = {
    products: [],
    validationState: undefined,
    errorMessage: undefined,
}

const generateRandomId = () => '_' + Math.random().toString(36).substr(2, 9);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
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
            const productIndex = state.products.findIndex(product => product.name === action.payload.name)
            return {
                ...state,
                validationState: ValidationState.Fulfilled,
                errorMessage: undefined,
                products: productIndex !== -1
                    ? state.products.map(item => {
                            if (item.name.toUpperCase() === action.payload.name.toUpperCase()) {
                                return {
                                    ...item,
                                    qty: item.qty + +action.payload.qty
                                }
                            }
                            return item
                        })
                    : [...state.products, { ...action.payload, qty: +action.payload.qty, price: +action.payload.price, id: generateRandomId(), img: dummy}]
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

export const {removeProduct, incrementProduct, decrementProduct} = productsSlice.actions

export const getProductsSelector = (state: RootState) => state.products.products
export const getTotalPrice = (state: RootState) => state.products.products.reduce((acc, next) => acc += (next.qty * next.price), 0)
export const getTotalAmount = (state: RootState) => state.products.products.reduce((acc, next) => acc += next.qty, 0)
export const getErrorMessage = (state: RootState) => state.products.errorMessage
export const isPending = (state: RootState) => (state.products.validationState === ValidationState.Pending)

export default productsSlice.reducer