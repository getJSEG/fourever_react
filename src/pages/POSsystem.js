
import React, { useEffect, Component, useState } from "react";
// import React, { useEffect, Fragment, useState } from "react";
import '../static/css/pages/login.css'


// Functions
import { searchSKU } from '../actions/POSsystem.js';
import { connect } from 'react-redux';
import  { Navigate, useLocation } from 'react-router-dom';
import CSRFToken from '../components/CSRFToken.js';

// style sheet
import "../static/css/pages/POSsystem.css"

//  Compoenents
import LineItem from "../components/LineItem.js";

// ADD AN INPUT FIELD FOR ADDING DISCOUNT

const POSsystem = ({ searchSKU, skuInfo_global, fieldErr_global, location_pre_taxed, location_tax }) => {

    let [lineItem, setLineItem] = useState([]);
    let [sku, setsku] = useState('');
    let [subtotal, setSubtotal] =  useState(0);
    let barcodeScan = ''

    const deleteItems = (sku) =>{ setLineItem( (index) => index.filter( (index, i) => { return index.sku !== sku })) }

    // Change qty by scanning duplicate item
    const changeQTY = (id) => {
        let newObject = lineItem.map( (item, index) => {
             if(item == id){
                return {...item, qty: item.qty + 1, qty_total: item.price * Number(item.qty + 1) }
            }
            return item
        })
        setLineItem(newObject)
    }

    // Change quanitity by entering a number
    const manualChangeValue = (e, sku) => {
        let newObject = lineItem.map( (item, index) => {
            if(item.sku == sku){ return {...item, qty: Number(e.target.value), qty_total: item.price * Number(e.target.value) } }
            return item
        })
        getSubTotal();
        setLineItem(newObject);
    }

    // Check if the sku is duplicate
    // TODO: make a faster algotirth to search for duplicate
    const isDuplicate = (sku) => {
        if( lineItem !== null) {
            for(let i= 0 ; i < lineItem.length; i++){
                if(lineItem[i].sku === sku){
                    changeQTY(lineItem[i])
                    return true;
                }
            }
            return false;
        }
    }

    // update subtotal
    const getSubTotal = () => {
        
        let sub_ = 0;

        for(let i= 0 ; i < lineItem.length; i++){
            sub_ = sub_ + lineItem[i].qty_total

        }

        setSubtotal( sub_ );
    } 

    //getting the input from input field
    const handleskuChange= (e) => { setsku(e.target.value) }

    // this will search the items in the backend by submitting the form
    const skuSearch =  (e) => {
        e.preventDefault()
        searchSKU(sku)
        setsku('')                                                                        //Clear the input after submiting
    }

    useEffect( () => {
        // if is not a duplicate create new item and add it to the list
        if( skuInfo_global !== null){
            if(!isDuplicate(skuInfo_global.sku)) {
                setLineItem(prevlineItem => prevlineItem.concat(
                {
                    name: skuInfo_global.name,
                    sku: skuInfo_global.sku,
                    price: skuInfo_global.listed_price,
                    qty: 1,
                    qty_total: skuInfo_global.listed_price * 1,
                }))
            }
        }
            
    }, [skuInfo_global])

    useEffect( () => {
        getSubTotal();
    }, [lineItem])

    // This will check for key down in the window
    useEffect(() => {
        function handleKeyDown(e){

            if(barcodeScan === "EnterEnter"  || barcodeScan === "EnterEnterEnter"){
                barcodeScan = ''
                return
            }

            if( e.keyCode === 13 && barcodeScan.length > 5){
                setsku(barcodeScan)
                console.log("this run empty: " + barcodeScan)
                searchSKU(barcodeScan).then( p => {
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

        return function cleanup() {
            document.removeEventListener('keydown', handleKeyDown)
        }

    },[])
 
    return (
        <div id="pos-system-container">
            <div id="pos-system-wrapper">

                <div className='sku-input-container'> 
                    <form method="POST" onSubmit={ (e) => skuSearch(e)}>
                    <input type="text" value={sku} name="message"
                            placeholder="Escriba o escanee el SKU del articulo para comenzar"
                        onChange={(e) => handleskuChange(e)}>
                        </input>
                    </form>
                </div>
            
                <div className='listitems-container'>
                    <table>
                        <thead>
                            <tr>
                                <th id="pos-line-item"> Articulo </th>
                                <th id="pos-qty-item"> Cantidad </th>
                                <th id="pos-up-item"> Precio Unitario </th>
                                <th id="pos-total-item"> Total </th>
                                <th id="pos-delete-item"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {   
                                lineItem !== null ? 
                                lineItem?.map((item) => { 
                                    // calculate the subtotal
                                    // setSubtotal(prev => prev + item.qty_total)

                                    return  <LineItem key={item.sku} item={item} changeQTY={changeQTY} 
                                                    changeqtyManual={manualChangeValue} skuItem={item.sku}
                                                    deleteSelf={deleteItems}/> 

                                }) 
                                : null           
                        }
                        </tbody>
                    </table>

                </div>

                <div className="pos-payment-information">

                    <div className="item-and-discount-contariner">
                        <div className="item-and-discount-labels">
                            <label> Productos </label>
                            <label> Descuentos </label>
                        </div>
                        <div className="item-and-discount-info">
                            <p> { lineItem !== null ? lineItem.length : 0 }</p>
                            <p>$ 0.00 </p>
                        </div>
                    </div>

                    <div className="calculated-price">
                        <div className="calculated-price-label">
                            <label> Subtotal </label>
                            <label className={`${ !location_pre_taxed ? 'include_tax': 'dont-include-tax'}`}> Impuestos </label>
                            <label> Pago </label>
                        </div>
                        <div className="calculated-price-info">
                            <p>$ { subtotal }</p>
                            <p className={`${ !location_pre_taxed ? 'include_tax': 'dont-include-tax'}`} > $ { !location_pre_taxed ? (location_tax/100)*subtotal : 0} </p>
                            <p> $ 0.00 </p>
                        </div>

                        <div className="balance-due">
                            <button> <h2>${ !location_pre_taxed ? ((location_tax/100)*subtotal) + subtotal : subtotal }</h2> </button>
                        </div>
                    </div>
                </div>
          </div>
        </div>
      );
}

const mapStateToProps = state => ({
    skuInfo_global: state.posSystem.skuInfo,
    location_tax: state.Location_re.location_tax,
    location_pre_taxed: state.Location_re.location_pre_taxed
});

export default connect(mapStateToProps, {searchSKU})(POSsystem);