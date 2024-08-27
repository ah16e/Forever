import { createContext, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export let ShopContext =createContext();

let headers = {
    token : localStorage.getItem("userToken")
}

const ShopContextProvider = (props)=> {

    let currency = '$';
    let delivry_fee = 10;
    const [serach, setSerach] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    let navigate = useNavigate()


    let addToCart = async (itemId,size)=>{

        if (!size) {
            toast.error('Select Product Size');
            return;
        }
            let cartData = structuredClone(cartItems);
            if (cartData[itemId]) {
                if (cartData[itemId][size]) {
                    cartData[itemId][size] += 1;
                }
                else{
                    cartData[itemId][size] = 1;
                }
            }
            else{
                cartData[itemId] = {};
                cartData[itemId][size] = 1;
            }
            setCartItems(cartData);
    }

    let getCartCount = ()=> {
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalCount;
    }

    let updateQuantity = async (itemId,size,quantity)=> {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;

        setCartItems(cartData)
    }


    let getCartAmount =  ()=>{
        let totalAmount = 0;
        for(let items in cartItems){
            let iteminfo = products.find((product)=> product._id === items);
            for(const item in cartItems[items]){
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += iteminfo.price * cartItems[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalAmount;
    }


   


    let value = {
        products , currency ,getCartAmount , navigate , updateQuantity  ,  delivry_fee , serach,setSerach ,showSearch,setShowSearch,cartItems , addToCart , getCartCount
    }

    return <>
    <ShopContext.Provider value={value}>
        {props.children}
    </ShopContext.Provider>
    
    </>
}

export default ShopContextProvider;