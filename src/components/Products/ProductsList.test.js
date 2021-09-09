import React from "react"
import ProductsList from "./ProductsList";
import {render, findAllByTestId, fireEvent, within} from "@testing-library/react";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import witcher from "../../images/witcher.png";
import morrowind from "../../images/morrowind.png";


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

describe( "ProductsList", () => {
        test('renders products', async () => {
            const {findAllByTestId} = render(<Provider store={store}><ProductsList /></Provider>)
            const productNames = (await findAllByTestId('product-name')).map(p => p.textContent)
            const fakeProductNames = fakeProducts.map(fp => fp.name)
            expect(productNames).toEqual(fakeProductNames)
        })

/*        it('should remove a product', async () => {
            let itemId = '1'
            const {findAllByTestId} = render(<Provider store={store}><ProductsList/></Provider>)
            const productIds = async () => (await findAllByTestId('product-name')).map(p => ({
                name: p.textContent,
                removeButton: within(p).findByTestId('removeItem')
            }))
            console.log(...productIds)
            const removeFirstItem = (await productIds()).find(p => p.id === itemId).removeButton
            fireEvent.click(removeFirstItem)
            expect((await productIds()).find(p => p.id === itemId)).toBeFalsy()
        })*/
    }
)