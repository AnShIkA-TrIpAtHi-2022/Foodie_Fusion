import { createContext, useEffect, useState } from "react";
import { food_list, menu_list } from "../assets/assets";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const url = "http://localhost:4000"
    const [food_list, setFoodList] = useState([]);
    const [cartItems, setCartItems] = useState({}); // Ensure cartItems is initialized as an empty object
    const [token, setToken] = useState("")
    const currency = "₹";
    const deliveryCharge = 50;

    const addToCart = async (itemTitle) => {
        if (!itemTitle) {
            console.error('addToCart called with undefined itemTitle');
            return;
        }

        setCartItems((prev) => {
            const updatedCart = { ...prev };
            if (!updatedCart[itemTitle]) {
                updatedCart[itemTitle] = 1;
            } else {
                updatedCart[itemTitle] += 1;
            }
            return updatedCart;
        });

        if (token) {
            try {
                await fetch(url + "/api/cart/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        token: token,
                    },
                    body: JSON.stringify({ itemTitle }),
                });
            } catch (error) {
                console.error('Failed to add item to cart:', error);
            }
        }
    };

    const removeFromCart = async (itemTitle) => {
        if (!itemTitle) {
            console.error('removeFromCart called with undefined itemTitle');
            return;
        }

        setCartItems((prev) => {
            const updatedCart = { ...prev };
            if (updatedCart[itemTitle] > 0) {
                updatedCart[itemTitle] -= 1;
            }
            if (updatedCart[itemTitle] === 0) {
                delete updatedCart[itemTitle];
            }
            return updatedCart;
        });

        if (token) {
            try {
                await fetch(url + "/api/cart/remove", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        token: token,
                    },
                    body: JSON.stringify({ itemTitle }),
                });
            } catch (error) {
                console.error('Failed to remove item from cart:', error);
            }
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            try {
              if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }  
            } catch (error) {
                console.log(error)
            }
            
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: token });
        setCartItems(response.data.cartData);
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData({ token: localStorage.getItem("token") })
            }
        }
        loadData()
    }, [])

    const contextValue = {
        url,
        food_list,
        menu_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        loadCartData,
        setCartItems,
        currency,
        deliveryCharge
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;