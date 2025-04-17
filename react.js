import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const [cart, setCart] = useState([]);

    const products = [
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 20 },
        { id: 3, name: 'Product 3', price: 30 },
    ];

    const addToCart = (product) => {
        const existingProduct = cart.find((item) => item.id === product.id);
        if (existingProduct) {
            setCart(
                cart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const incrementQuantity = (id) => {
        setCart(
            cart.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decrementQuantity = (id) => {
        setCart(
            cart.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const removeFromCart = (id) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <div className="grid grid-cols-3 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="border p-4 rounded">
                        <h2 className="text-lg font-semibold">{product.name}</h2>
                        <p>${product.price}</p>
                        <button
                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={() => addToCart(product)}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>

            <h1 className="text-2xl font-bold mt-8 mb-4">Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between items-center border p-4 rounded mb-2"
                        >
                            <div>
                                <h2 className="text-lg font-semibold">{item.name}</h2>
                                <p>${item.price} x {item.quantity}</p>
                            </div>
                            <div className="flex items-center">
                                <button
                                    className="bg-gray-300 px-2 py-1 rounded"
                                    onClick={() => decrementQuantity(item.id)}
                                >
                                    -
                                </button>
                                <span className="mx-2">{item.quantity}</span>
                                <button
                                    className="bg-gray-300 px-2 py-1 rounded"
                                    onClick={() => incrementQuantity(item.id)}
                                >
                                    +
                                </button>
                                <button
                                    className="ml-4 bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <button
                        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
                        onClick={() => alert('Proceed to Payment Page')}
                    >
                        Proceed to Payment
                    </button>
                </div>
            )}
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));