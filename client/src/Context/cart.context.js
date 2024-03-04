import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    
    //default axios
    useEffect(() => {
        let existingCart = localStorage.getItem('cart');
        if(existingCart){
            setCart(JSON.parse(existingCart));
        }
    }, [])
    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    )
}

// Custom hook 
const useCart = () => useContext(CartContext);

export { CartProvider, useCart };

