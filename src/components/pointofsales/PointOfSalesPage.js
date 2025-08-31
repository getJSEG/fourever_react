import React, { useEffect, Component, useState } from "react";
import  { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";

import { useGetPosProductsQuery } from "../../features/pos/posApiSlice.js";
import { selectStoreTax } from "../../features/location/locationSlice.js";
import { selectIsPreTax } from "../../features/location/locationSlice.js";

//  Components
import POSProducts from "./components/products/POSProducts.js";
import ShoppingCart from "./components/shoppingCart/ShoppingCart.js";
import Loading from "../common/Loading.js";
import Payment from "./components/payment/Payment.js";
import ErrorMessage from "../AlertMessage/ErrorMessage.js";
import SuccessMessage from "../AlertMessage/SuccessMessage.js";

// style sheet
import '../../static/css/pages/POSSystem/POSsystem.css';

// { getProductPOS, productsPOS, SKUSearch, isLoading, transactionFailMsg, resetTransactionFail}
const PointOfSalesPage = () => {

    const { data: posProductsData, isLoading: isProductLoading, isSuccess: isProductSuccess, isError: isProductError, error: productErrro } = useGetPosProductsQuery()
    
    let barcodeScan = '';

    const taxPercentage = useSelector(selectStoreTax);
    const isPreTax = useSelector(selectIsPreTax);
    
    //  CartObject Here
    const [shoppingCart, setShoppingCart] = useState([]);
    const [customerInfo, setCustomerInfor] = useState({});
    const [orderSummary, setOrderSummary] = useState({ shipping: 0, discount: 0, tax: 0, totalAmount: 0, subtotal:0, preTax: isPreTax });
    const [paymentMethod, setPaymentMethod] = useState({})
    const [barcode, setBarcode] = useState('');

    const [displayPaymentWindow, setDisplayPaymentWindow] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");


    /* Hanlder Functions here */
    const errorMessageHandler = (message) => {
        setErrorMessage(message);
    }

    const successMessageHandler = (message) => {
        setSuccessMessage(message)
    }

    // handling ecery time the discount, totalamount or tax changes
    const orderSummaryHandler = ({subtotal=orderSummary?.subtotal, discount=orderSummary?.discount, tax=taxPercentage }) => {
        let newDiscount = 0;
        let newTax = 0;

        if (discount != 0 ){ newDiscount = ((discount/100) * subtotal);  }
        if (tax != 0 && !isPreTax){ newTax = (tax/100) * subtotal; }

        setOrderSummary( prevdata => ({ ...prevdata, 
                                        totalAmount: Number((subtotal - newDiscount) + newTax).toFixed(2),
                                        subtotal: subtotal,
                                        discount: newDiscount,
                                        tax: newTax }))
    }

    // This checks if item in shopping cart is duplicate or not
    const isDuplicate = (sku) => {
        if(shoppingCart.length < 0)
            return -1;
        return shoppingCart.findIndex( obj => obj?.sku === sku);
    }

    // Changes the quanitity of the cart items
    const changeQTY = (index , value) => {
        setShoppingCart( (prev)=> {
            let newArray = [...prev]
            newArray[index] = { 
                    ...newArray[index],
                    quantity: value,
                    subtotal: newArray[index].price * value}
            return newArray
        })
    }

    const addToShoppingCart = (product) => {
        const index = isDuplicate(product?.sku);

        if(index !== -1){
            // if item already exist then just add one to the product if ascaned or selected from the product selection window
            const increateUnitsByOne = shoppingCart[index]?.quantity + 1;
            changeQTY(index, increateUnitsByOne)
        }
        if(index === -1){
            // Add new item here
            setShoppingCart(prev => [...prev, product]);
        }
    }

    // Removes item from cart
    const RemoveFromShoppingCart = (e, sku) => {
        e.preventDefault();
        setShoppingCart( prevShoppingCart => prevShoppingCart.filter( cartItem => cartItem?.sku !== sku ))
    }

    // clear shopping cart
    const clearShoppingcartHandler = () => {
        setOrderSummary({ shipping: 0, discount: 0, tax: 0, totalAmount: 0, subtotal:0, preTax: isPreTax })
        setShoppingCart([]);
    }

    const paymentWindowHandler = (isOpen) => {
        setDisplayPaymentWindow(isOpen)
    }



    // This handles the barcode scanner
    useEffect(() => {
        function handleKeyDown(e){

            if(barcodeScan === "EnterEnter"  || barcodeScan === "EnterEnterEnter"){
                barcodeScan = ''
                setBarcode('');
                return;
            }
            if( e.keyCode === 13 && barcodeScan.length > 5){
                setBarcode(barcodeScan);
                return;
            }
            if( e.keyCode === 16){ return; }

            barcodeScan += e.key
            setTimeout( () => {  barcodeScan = ""; setBarcode(''); }, 200)
        }
        document.addEventListener('keydown', handleKeyDown)
        return function cleanup() { document.removeEventListener('keydown', handleKeyDown) }

    },[barcodeScan])


    // this updated the subtotal if the shoppping cart is updated
    useEffect( () => {
        orderSummaryHandler({ 
            subtotal:shoppingCart.reduce( (total, product) => total + Number(product?.subtotal), 0) } );
    }, [shoppingCart])

    // we watch for change because sometime it does not reload when mounting
    useEffect( () => {
        setOrderSummary({...orderSummary, preTax: isPreTax})
    }, [isPreTax]);
    
    // when unmounting
    useEffect(() => {
        return () => { 
            // clearDataHandler();
        }
    }, [])

    let content = isProductLoading ? <Loading /> : (
        // id=pos-system-container for component below className="main-container"
        <div id="pos-system-container" >
            {
                errorMessage && 
                <ErrorMessage 
                    message ={ errorMessage }
                    errorMessageHandler = { errorMessageHandler }
                />
            }
            
            <div id="pos-system-product-search">
                {
                    !isProductLoading 
                        ? <POSProducts 
                            products = {posProductsData}
                            addToShoppingCart={addToShoppingCart} 
                            barcode={barcode}
                            />
                         : <div> No hay productos para empesar transaciones </div>
                }
            </div>


            <ShoppingCart 
                shoppingCart={shoppingCart}
                removeItemFromCart={ RemoveFromShoppingCart }
                changeQTY = { changeQTY }
                clearShoppingcartHandler={clearShoppingcartHandler}
                paymentWindowHandler = { paymentWindowHandler }
                order = {orderSummary}
                orderHandler = { orderSummaryHandler }
            />

            { displayPaymentWindow && 
                <Payment  paymentWindowHandler = {paymentWindowHandler}
                          order = { orderSummary }
                          shoppingCart={ shoppingCart } 
                          errorMessageHandler = { errorMessageHandler}
                        /> 
            }
                
        </div>
      )


      return content
}


export default PointOfSalesPage;