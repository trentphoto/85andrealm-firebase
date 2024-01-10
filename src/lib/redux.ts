import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '@/types/types';

export interface IState {
    cart: Product[];
    ui: boolean;
    favorites: Product[];
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: [] as Product[],
    reducers: {
        addToCart: (state, { payload }: PayloadAction<Product>): Product[] => {

            // find if the item already exists in the cart
            const find = state.find((item: Product) => item.id === payload.id)

            if (find) {
                // if the item exists, update the quantity of the item to the quantity passed in the payload
                return state.map((item: Product) => 
                    item.id === payload.id ? { ...item, quantity: (payload.quantity! + item.quantity!) } : item
                )
            } else { 
                // if the item does not exist, add the item to the cart and set the quantity to 1
                return [...state, payload]
            }
        },
        removeFromCart: (state, { payload }) => {
            // filter the item out of the cart. return all items that do not match the id of the item to be removed
            return state.filter((item: Product) => item.id !== payload.id)
        },
        increaseCartItemQuantity: (state, { payload }) => {
            // increase the quantity of the item by 1
            return state.map((item: Product) => 
                item.id === payload.id ? { ...item, quantity: item.quantity! + 1 } : item
            )
        },
        decreaseCartItemQuantity: (state, { payload }) => {
            // decrease the quantity of the item by 1
            return state.map((item: Product) => 
                item.id === payload.id ? { ...item, quantity: item.quantity! - 1 } : item
            )
        },
        setCartItemQuantity: (state, { payload }) => {
            // set the quantity of the item to the value of the payload
            return state.map((item: Product) => 
                item.id === payload.id ? { ...item, quantity: payload.quantity } : item
            )
        }
    }
})

export const { addToCart, removeFromCart, increaseCartItemQuantity, decreaseCartItemQuantity, setCartItemQuantity } = cartSlice.actions

const uiSlice = createSlice({
    name: 'ui',
    initialState: false,
    reducers: {
        toggle: (state) => !state
    }
})

export const { toggle } = uiSlice.actions

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: [] as Product[],
    reducers: {
        updateFavorites: (state, { payload }: PayloadAction<Product>): Product[] => {
            // find if the item already exists in favorites
            const find = state.find((item: Product) => item.id === payload.id)

            if (find) {
                // if the item exists, remote it 
                return state.filter((item: Product) => item.id !== payload.id)
            } else {
                // if the item does not exist, add the item to favorites
                return [...state, payload]
            }
        },
    }
})

export const { updateFavorites } = favoritesSlice.actions

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        ui: uiSlice.reducer,
        favorites: favoritesSlice.reducer
    }
})

export default store;
