import React, { useEffect, Component, useState } from "react";

// Functions
// import { SKUSearch } from '../../actions/PointOfSales/POSsystem.js';
// import { connect } from 'react-redux';
import  { Navigate, useLocation } from 'react-router-dom';

import { useGetPosProductsQuery } from "../../features/pos/posApiSlice.js";
//  Components
import POSProducts from "./components/products/POSProducts.js";
import ShoppingCart from "./components/shoppingCart/ShoppingCart.js";
import Loading from "../common/Loading.js";
// import Checkout from "./Checkout.js";
// import AlertMessage from "../../components/common/AlertMessage.js";

// style sheet
import '../../static/css/pages/POSSystem/POSsystem.css';

// { getProductPOS, productsPOS, SKUSearch, isLoading, transactionFailMsg, resetTransactionFail}
const PointOfSalesPage = () => {
    const {
        data:
        posProductsData,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPosProductsQuery()

    //  CartObject Here
    const [shoppingCart, setShoppingCart] = useState([]);
    const [barcode, setBarcode] = useState('');
    let barcodeScan = '';

    // This checks if the product is duplicate or not
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
                    units: value,
                    subtotal: newArray[index].price * value}
            return newArray
        })
    }

    // Add items to array
    const addToShoppingCart = (product) => {
        const index = isDuplicate(product?.sku);

        if(index !== -1){
            // if item already exist then just add one to the product if ascaned or selected from the product selection window
            const increateUnitsByOne = shoppingCart[index]?.units + 1;
            changeQTY(index, increateUnitsByOne)
        }
        if(index === -1){
            // Add new item here
            setShoppingCart(prevlineItem => prevlineItem.concat({
                name: product?.product.name,
                units: 1,
                sku: product?.sku,
                price: Number(product?.price).toFixed(2),
                subtotal: Number(product?.price).toFixed(2)
                } ));
        }
    }

    // Removes item from cart
    const RemoveFromShoppingCart = (e, sku) => {
        e.preventDefault();
        setShoppingCart( prevShoppingCart => prevShoppingCart.filter( cartItem => cartItem?.sku !== sku ))
    }

    // clear shopping cart
    const handleClearShoppingCart = () => {
        setShoppingCart([]);
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







    // Remove Item
    // let barcodeScan = '';
    // const [shoppingCartItems, setshoppingCartItems] = useState([]);
    // const [totalCartItems, setTotalCartItems]  = useState(0);
    // const [sku, setsku] = useState('');
    
    // // AlertMessages
    // const [message, setMessage] = useState("");
    // const [isError, setIsError] = useState(false);

    // // Handle Alert messages
    // const handleAlertMessage = (msg, isErr) => {
    //     setMessage(msg);
    //     setIsError(isErr);
    // }

    // useEffect( ()=> {
    //     handleAlertMessage(transactionFailMsg, true);
    // }, [transactionFailMsg]);

    // // This Clear the search Query
    // const clearSearch = (e) => {
    //     e.preventDefault();
    //     setsku('');
    // }

    // useEffect( () =>{
    //     setTotalCartItems(shoppingCartItems.length)
    // }, [shoppingCartItems])
    // // Get the All the products varients
    // useEffect( () =>{
    //     getProductPOS()
    // }, [])

    // // change QTY when the product is scanned or Selected Manually
    // const changeQTY = (sku) => {
    //     setshoppingCartItems(shoppingCartItems.map((object, index) => {
    //         if(object.sku === sku){
    //             return {
    //                     ...object,
    //                     units: object.units + 1,
    //                     price: object.unitPrice * (object.units + 1),
    //                 };
    //             }
    //         else{
    //             return object
    //         }
    //     }))
    // }

    // // Check if the sku is duplicate
    // const isDuplicate = (sku) => {
    //     if( shoppingCartItems !== null) {
    //         //  finds the item in the object array
    //         let lineItem = shoppingCartItems.findIndex( obj => obj.sku === sku);
    //         if(lineItem !== -1){
    //             changeQTY(shoppingCartItems[lineItem].sku)
    //             return true;
    //         }else{ return false; }
    //     }
    // }
    
    // // this add the item to the filtering 
    // const addSelectedProduct = (product) => {
    //     if(!isDuplicate(product.sku)) {
    //         setshoppingCartItems(prevlineItem => prevlineItem.concat( product ));
    //     } 
    // }

    // // Deleting item from the Shopping "Cart"
    // const deleteItems = (sku) =>{ 
    //     setshoppingCartItems( (index) => index.filter( (index, i) => { 
    //         return index.sku !== sku 
    //     })) 
    // }

    // const handleShoppintCart = (updateItem) => {
    //     setshoppingCartItems(updateItem)
    // }
    
    // // Adding
    // const add = (item) => {
    //     const updateItem = {
    //         ...item, units: item.units + 1, price: Number(item.unitPrice) * (item.units + 1)
    //     }
    //     return updateItem;
    // }
    // // Subtranting
    // const diff = (item) => {
    //     let updateItem = {}

    //     if(item.units === 1) { updateItem = { ...item } }
    //     if(item.units <= 0) { updateItem = { ...item, units: 1, price: Number(item.unitPrice) * 1 } }
    //     else{ updateItem = { ...item, units: item.units - 1, price: Number(item.unitPrice) * (item.units - 1) }  }

    //     return updateItem;
    // }
    // const manual = (value, item) => {
    //     let updateItem = {}
    //     if(Number(value) <= 0) {
    //         updateItem = { ...item, units: 1, price: Number(item.unitPrice) * 1 }
    //     }else{
    //         updateItem = { ...item, units: Number(value) , price: Number(item.unitPrice) * Number(value) }  
    //     }
    //     return updateItem;
    // }
    // // Updating  quantity
    // const updateQty = (e, sku, operation) => {
    //     e.preventDefault();
    //     const index = shoppingCartItems.findIndex(cart =>  cart.sku === sku);
    //     if( index === -1) return;

    //     const item = shoppingCartItems[index]

    //     let updateItem = {}
    //     if(operation === 'add'){  updateItem = add(item); }
    //     if(operation === 'diff') { updateItem = diff(item); }
    //     if(operation === 'manual') {updateItem = manual(e.target.value, item) }
    
    //     const updatedArray = [...shoppingCartItems];
    //     updatedArray[index] = updateItem;

    //     setshoppingCartItems(updatedArray);
    // }

    // //getting the input from input field
    // const handleSearchTerm = (e) => { 
    //     e.preventDefault()
    //     setsku(e.target.value)
    // }

    // This will check for key down in the window [FOR BARCODE SCANNER]
    // useEffect(() => {
    //     function handleKeyDown(e){

    //         if(barcodeScan === "EnterEnter"  || barcodeScan === "EnterEnterEnter"){
    //             barcodeScan = ''
    //             return;
    //         }
    //         if( e.keyCode === 13 && barcodeScan.length > 5){
    //             // setsku(barcodeScan)
    //             // SKUSearch(barcodeScan).then( p => {
    //             //     setsku('');
    //             //     barcodeScan = '';
    //             // })
    //             setBarcode(barcode)
    //             return;
    //         }

    //         if( e.keyCode === 16){ return; }
    //         barcodeScan += e.key
    //         setTimeout( () => {
    //             barcodeScan = "";
    //         }, 300)
    //     }
    //     document.addEventListener('keydown', handleKeyDown)
    //     return function cleanup() { document.removeEventListener('keydown', handleKeyDown) }

    // },[barcodeScan])
    
    // const handleTagTabs = (e) => {
    //     setsku(e.target.innerText.trim())
    // }

    // Reset Message
    // useEffect( ()=> {
    //     if(message !== ""){
    //         const timeout = setTimeout(() => {
    //             handleAlertMessage("", false);
    //             resetTransactionFail();
    //         }, 5000); // 5 seconds
    //         return () => clearTimeout(timeout);
    //     }
    // }, [message])

    let content = isLoading ? <Loading /> : (
        // id=pos-system-container for component below className="main-container"
        <div id="pos-system-container" >
            {/* { message !== "" ? <AlertMessage message={message} isError={isError}/>: null} */}
            {/* < /> */}
            
            <div id="pos-system-product-search">

                {
                    !isLoading 
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
                handleClearShoppingCart={handleClearShoppingCart}
            />

            {/* <Checkout
                shoppingCartItems={shoppingCartItems}
                deleteItem = {deleteItems}
                handleShoppintCart={handleShoppintCart}
                totalCartItems={totalCartItems}
                updateQty={updateQty}
            /> */}
    
        </div>
      )


      return content
}


export default PointOfSalesPage;