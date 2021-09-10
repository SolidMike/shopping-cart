import React from "react"
import ProductsList from "./ProductsList";
import {render, findAllByTestId, fireEvent, within} from "@testing-library/react";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import witcher from "../../images/witcher.png";
import morrowind from "../../images/morrowind.png";
import store2 from "../../store/store";

import {fetchProducts} from "../../api/fake.api";

jest.mock('../../api/fake.api');

const store = configureStore({
    reducer: {
        products: () => ({
            products: [
                {id: '1', name: 'Witcher', price: 50, qty: 1, img: witcher},
                {id: '2', name: 'Heroes', price: 40, qty: 2, img: witcher},
                {id: '3', name: 'Morrowind', price: 60, qty: 3, img: morrowind},
            ]
        })
    }
})

const fakeProducts = [
    {id: '1', name: 'Witcher', price: 50, qty: 1, img: witcher},
    {id: '2', name: 'Heroes', price: 40, qty: 2, img: witcher},
    {id: '3', name: 'Morrowind', price: 60, qty: 3, img: morrowind},
]

describe("ProductsList", () => {
        test('renders products', async () => {
            const {findAllByTestId} = render(<Provider store={store}><ProductsList/></Provider>)
            const productNames = (await findAllByTestId('product-name')).map(p => p.textContent)
            const fakeProductNames = fakeProducts.map(fp => fp.name)
            expect(productNames).toEqual(fakeProductNames)
        })

        it('should remove a product', async () => {
            fetchProducts.mockImplementationOnce(() => Promise.resolve(fakeProducts))

            let itemId = 'Witcher'

            const {findAllByTestId} = render(<Provider store={store2}><ProductsList/></Provider>)

            const productIds = async () => {
                const elements = await findAllByTestId('product-element');

                const result = []

                for (const elem of elements) {
                    result.push({
                        name: (await within(elem).findByTestId('product-name')).textContent,
                        removeButton: (await within(elem).findByTestId('removeItem'))
                    })
                }

                return result
            }


            const products = await productIds();
            const removeFirstItem = products.find(p => p.name === itemId).removeButton

            fireEvent.click(removeFirstItem);

            const productsAfterRemove = await productIds();

            expect(productsAfterRemove.some(p => p.name === itemId)).toBeFalsy()
        })
    }
)