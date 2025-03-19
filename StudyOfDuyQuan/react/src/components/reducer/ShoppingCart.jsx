import React, { useReducer } from "react";

const products = [
    { id: 1, name: "Laptop", price: 1000 },
    { id: 2, name: "Phone", price: 500 },
    { id: 3, name: "Tablet", price: 300 }
];

const initialState = {
    cart: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART": {
            const existingItem = state.cart.find(item => item.id === action.payload.id);
            if (existingItem) {
                return {
                    ...state,
                    cart: state.cart.map(item =>
                        item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
                    )
                };
            } else {
                return {
                    ...state,
                    cart: [...state.cart, { ...action.payload, quantity: 1 }]
                };
            }
        }
        case "REMOVE_FROM_CART": {
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload.id)
            };
        }
        case "INCREASE_QUANTITY": {
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            };
        }
        case "DECREASE_QUANTITY": {
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.payload.id && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                ).filter(item => item.quantity > 0)
            };
        }
        default:
            return state;
    }
};

const ShoppingCart = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const totalPrice = state.cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div style={{ padding: "20px" }}>
            <h2>🛒 Shopping Cart</h2>
            <h3>Products</h3>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - ${product.price}
                        <button onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}>
                            Add to Cart
                        </button>
                    </li>
                ))}
            </ul>
            <h3>Cart</h3>
            {state.cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {state.cart.map(item => (
                        <li key={item.id}>
                            {item.name} - ${item.price} x {item.quantity}
                            <button onClick={() => dispatch({ type: "INCREASE_QUANTITY", payload: item })}>+</button>
                            <button onClick={() => dispatch({ type: "DECREASE_QUANTITY", payload: item })}>-</button>
                            <button onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item })}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            <h3>Total: ${totalPrice}</h3>
        </div>
    );
};

export default ShoppingCart;
