import React, { useEffect, Component, useState } from "react";

// Functions
import { SKUSearch } from '../actions/POSSystem/POSsystem.js';
import { connect } from 'react-redux';
import  { Navigate, useLocation } from 'react-router-dom';
import { getProductPOS } from "../actions/POSSystem/POSsystem.js";

//  Components
import POSProducts from "../components/posSystem/POSProducts.js";
import Checkout from "../components/posSystem/Checkout.js";

// style sheet
import "../static/css/pages/POSsystem/POSsystem.css";
import '../static/css/pages/POSSystem/discount.css';
import '../static/css/pages/POSSystem/LineItem.css';
import '../static/css/pages/POSSystem/payment.css';
import '../static/css/pages/login.css';


const POSsystem = ({ getProductPOS, productsPOS, SKUSearch}) => {

    let barcodeScan = ''
    let [shoppingCartItems, setshoppingCartItems] = useState([]);
    let [sku, setsku] = useState('');
    let [disocuntCodeMessage, setDiscountCodeMessage] = useState("")

    // Get the All the products varients
    useEffect( () =>{
        getProductPOS()
    }, [])

    // change QTY when the product is scanned or Selected Manually
    const changeQTY = (sku) => {
        setshoppingCartItems(shoppingCartItems.map((object, index) => {
            if(object.sku === sku){
                return {
                        ...object,
                        qty: object.qty + 1,
                        qty_total: object.price * (object.qty + 1),
                    };
                }
            else{
                return object
            }
        }))
    }

    // Check if the sku is duplicate
    const isDuplicate = (sku) => {
        if( shoppingCartItems !== null) {
            //  finds the item in the object array
            let lineItem = shoppingCartItems.findIndex( obj => obj.sku === sku);
            if(lineItem !== -1){
                changeQTY(shoppingCartItems[lineItem].sku)
                return true;
            }else{
                return false;
            }
        }
    }
    
    // this add the item to the filtering 
    const addSelectedProduct = (varient) => {
        console.log( varient )
        console.log("Item was added to the shopping cart")
       
        if(!isDuplicate(varient.sku)) {
            setshoppingCartItems(prevlineItem => prevlineItem.concat( varient ));
        }
        
    }
    // Deleting item from the Shopping "Cart"
    const deleteItems = (sku) =>{ 
        setshoppingCartItems( (index) => index.filter( (index, i) => { 
            return index.sku !== sku 
        })) 
    }

    const handleSetShoppingcart = (updateItem) => {
        setshoppingCartItems(updateItem)
    }
    
    // Change quanitity by entering a number
    const manualChangeValue = (e, sku) => {
        let newObject = shoppingCartItems.map( (item, index) => {
            if(item.sku == sku) {
                if(e.target.value === 0) {
                    return { 
                        ...item,
                        qty: 1,
                        qty_total: item.price * 1
                    }
                } else{
                    return { 
                        ...item,
                        qty: Number(e.target.value),
                        qty_total: item.price * Number(e.target.value)
                    }
                }
            }
            return item
        })
        // getSubTotal();
        setshoppingCartItems(newObject);
    }

    //getting the input from input field
    const handleSearchTerm = (e) => { 
        e.preventDefault()
        setsku(e.target.value)
    }

    // This will check for key down in the window [FOR BARCODE SCANNER]
    useEffect(() => {
        function handleKeyDown(e){

            if(barcodeScan === "EnterEnter"  || barcodeScan === "EnterEnterEnter"){
                barcodeScan = ''
                return
            }
            if( e.keyCode === 13 && barcodeScan.length > 5){
                setsku(barcodeScan)
                console.log("this run empty: " + barcodeScan)
                SKUSearch(barcodeScan).then( p => {
                    setsku('');
                    barcodeScan = '';
                })
                return
            }

            if( e.keyCode === 16){ return }

            barcodeScan += e.key

            setTimeout( () => {
                barcodeScan = ""
            }, 300)
        }
        document.addEventListener('keydown', handleKeyDown)
        return function cleanup() { document.removeEventListener('keydown', handleKeyDown) }

    },[barcodeScan])
    
    const handleTagTabs = (e) => {
        console.log(e.target)
        console.log(e.target.value) 
    }


    return (
        <div id="pos-system-container">
            <div id="pos-system-product-search">

                <div className='sku-input-container'> 
                    <form method="POST" onSubmit={ (e) => skuSearch(e)}>
                    <input type="text" value={sku} name="message"
                            placeholder="Buscar Producto"
                            onChange={(e) => handleSearchTerm(e)}>
                        </input>
                    </form>
                </div>

                <POSProducts 
                            filterBy={sku} 
                            productList={ productsPOS }
                            addItemToList = {addSelectedProduct}
                    />
            </div>

            <Checkout
                shoppingCartItems={shoppingCartItems}
                deleteItem = {deleteItems}
                handleSetShoppingcart={handleSetShoppingcart}
                manualChangeValue = {manualChangeValue}
            />
    
        </div>
      );
}

const mapStateToProps = state => ({
    tax: state.location.tax,
    productsPOS: state.posSystem.productsPOS,
    isPreTaxed: state.location.isPreTaxed,
    discountInfo: state.discount.discountInfo,
    discountFail: state.discount.discountFail,
    discountMessage: state.discount.discountMessage
});

export default connect(mapStateToProps, {getProductPOS, SKUSearch})(POSsystem);