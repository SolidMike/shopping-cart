import reducer, {
    addAsyncProduct, decrementProduct,
    fetchAsyncProducts, incrementProduct,
    IProductsSliceState,
    ValidationState
} from './products.slice'
import {validateProduct, fetchProducts} from "../../api/fake.api";
import witcher from "../../images/witcher.png";
import morrowind from "../../images/morrowind.png";

jest.mock('../../api/fake.api');

const dispatch = jest.fn();

const state: IProductsSliceState = {
    products: [
        {id: '1', name: 'Witcher', price: 50, qty: 1, img: witcher},
        {id: '2', name: 'Heroes', price: 40, qty: 2, img: witcher},
        {id: '3', name: 'Morrowind', price: 60, qty: 3, img: morrowind},
    ],
    validationState: undefined,
    errorMessage: undefined,
}

it('products have been fetched successfully', async () => {
    const fetchAsyncProductsAction = fetchAsyncProducts();
    (fetchProducts as jest.MockedFunction<typeof fetchProducts>).mockImplementationOnce(() => Promise.resolve(state.products))
    const actual = await fetchAsyncProductsAction(dispatch, () => {}, undefined)
    const newState = reducer(state, actual)
    expect(newState.products.length).toBe(3)
})

it('new item added into cart. Products length should be incremented', async () => {

    const addAsyncProductAction = addAsyncProduct({
        id: 'hl',
        name: 'Half-Life',
        price: 300,
        qty: 1,
        img: ''
    });
    (validateProduct as jest.MockedFunction<typeof validateProduct>).mockResolvedValueOnce({
        id: 'hl',
        name: 'Half-Life',
        price: 300,
        qty: 1,
        img: ''
    });
    const actual = await addAsyncProductAction(dispatch, () => {}, undefined);

    const newState = reducer(state, actual)

    expect(newState.products.length).toBe(4)
    expect(newState.validationState).toEqual(ValidationState.Fulfilled)
    expect(newState.errorMessage).toBe(undefined)
})

it('product quantity has been incremented', () => {

        expect(reducer(state, incrementProduct('1'))).toEqual({
                ...state,
                products: state.products.map(
                    (item, i) => i === 0 ? {...item, qty: 2} : item
                )
        })
})

it('product quantity has been decremented', () => {

    expect(reducer(state, decrementProduct('1'))).toEqual({
        ...state,
        products: state.products.map(
            (item, i) => i === 0 ? {...item, qty: 0} : item
        )
    })
})