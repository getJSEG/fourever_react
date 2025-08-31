import React, { useState, useEffect }from "react";
import { useNavigate, useParams, useLocation} from "react-router-dom";

// api
import { useGetPosProductsQuery } from "../../../../features/pos/posApiSlice.js";


// Add products to cart
// able to remove items from cart
//  able to change qty from cart

// components
import Loading from "../../../common/Loading.js";
import { formatCurrecy } from "../../../../utils/currencyFormatter.js";

const ShippingProducts  = ({handleStepThree, handleStepTwo, handleShoppingCart, addOneQtyHandler, removeOneQtyHandler, removeItemFromCart,
    shoppingCart, discount, shippingPrice, subtotal, grandTotal, shippingPriceHandler, errorMessageHandler }) => {
    
    const{ data: products, isLoading } = useGetPosProductsQuery();
    let barcodeScan = '';

    const [search, setSearch] = useState('');
    const [barcode, setBarcode] = useState('');
 
    /* This function adds items to the shopping cart by scanning */
    const addProductWithScanner = () => {
        const filterProduct = products?.find( item => String(item?.sku).trim() === String(barcode).trim());
        
        if(filterProduct){
            handleShoppingCart(filterProduct);
        }
        if(barcode !== '' && filterProduct == 0 ){
            console.log("El producto puede estar desactivador, o no se encuetra en el sistema")
        }
    }

    /* Clears the Search input field */
    const clearSearch = () => { setSearch(''); }

    /* this handles the search input field */
    const searchHandler = (e) => {
        const {name, value} =  e.target
        setSearch( value )
    }

    const moveToLastStep = (e) => {
        if(shoppingCart.length > 0 ){
            handleStepThree(e, true);
        } else{
            errorMessageHandler("Es necesario agregar 1 o más artículos al paquete");
        }
    }

    /* All useEffect Below */ 

    useEffect( () => {
        addProductWithScanner();
    }, [barcode]);


    // This handles the barcode scanner
    useEffect(() => {
        function handleKeyDown(e){
            if(barcodeScan === "EnterEnter"  || barcodeScan === "EnterEnterEnter"){ barcodeScan = ''; setBarcode(''); return; }
            if( e.keyCode === 13 && barcodeScan.length > 5){ setBarcode(barcodeScan); return; }
            if( e.keyCode === 16){ return; }

            barcodeScan += e.key
            setTimeout( () => {  barcodeScan = ""; setBarcode(''); }, 400)
        }
        document.addEventListener('keydown', handleKeyDown)
        return function cleanup() { document.removeEventListener('keydown', handleKeyDown) }

    },[barcodeScan]);

    // add item information and save it
    let context = isLoading 
    ?
        <Loading /> 
    :
        ( <div className="mt1"> 
                <div className="background-container "> 
                    <div className="shipping-search-products">
                        <input
                            className="form-inputs p1 rounded-lg width-100"
                            name="search"
                            placeholder="Buscar"
                            type="text" 
                            autoComplete="off"
                            onChange={e => searchHandler(e)}
                            value={search}
                            ></input>

                        {
                            search !== ''
                            ?(<div className="overflow-scroll shipping-product-list">
                                    { (products?.filter( item =>
                                            item?.sku?.toLowerCase()?.indexOf(search.toLowerCase()) >= 0 ||
                                            item?.product?.name?.toLowerCase()?.indexOf(search.toLowerCase())  >= 0 
                                    
                                            )?.map( item=> {
                                                return  (<div  className="pointer shipping-searched-item " key={item?.id} onClick={ () =>{ handleShoppingCart(item); clearSearch(); }}>
                                                            <p className="pt11 fw400 width-30 p1"> {item?.product?.name} </p>
                                                            <p className="pt11 fw400 width-30 p1">{item?.color}</p>
                                                            <p className="pt11 fw400 width-30 p1">{item?.size}</p>
                                                        </div>)
                                            })
                                    ) }
                                </div> )
                            :null

                        }
                        
                    </div>



                    {/* Shipping cart list */}
                    <div className="pdt3">
                        <ul className="shipping-shopping-cart-list">
                            {
                                shoppingCart?.map( (item, index) => (
                                    <li key={item?.sku} className="gray-bg-40 shipping-shopping-li"> 
                                        <p> {item?.name} </p>
                                        <p> {item?.color} </p>
                                        <p> {item?.size} </p>
                                        <div className="flex-div"> 
                                            <p className="pointer" onClick={ () => removeOneQtyHandler(index, item?.quantity)}> - </p>
                                            <p> {item?.quantity} </p> 
                                            <p className="pointer"  onClick={ () => addOneQtyHandler(index, item?.quantity)}> + </p>
                                        </div>
                                        <p> {formatCurrecy(item?.price)} </p>
                                        <p> {formatCurrecy(item?.subtotal)} </p>
                                        <div onClick={ () => removeItemFromCart(item?.sku) }>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill pointer" viewBox="0 0 16 16">
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                            </svg> 
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>



                    <div className="shipping-total-amount">
                        <div className="pdr2">
                            <p className="pt12 fw600 pdb1"> Subtotal: </p>
                            <p className="pt12 fw600"> Envio: </p>
                            <p className="pt12 fw600 pdt1"> Total: </p>
                        </div>
                        
                        <div>
                            <p className="pdb1" > { formatCurrecy(subtotal) } </p>
                            <p>
                                <input
                                    className="remove-border bottom-border width-5em pt12"
                                    name="shipping"
                                    placeholder={formatCurrecy(shippingPrice)}
                                    type="number" 
                                    autoComplete="off"
                                    step="0.01"
                                    onChange={e => shippingPriceHandler(e)}
                                    value={shippingPrice} />
                            </p>
                            <p className="pdt1" > { formatCurrecy(grandTotal)}  </p>

                        </div>
                    </div>
                </div>
            <div className="shipping-button-cont">
                <div className="btn-primary rounded-lg p1 mt1 pointer"  onClick={ (e) =>  moveToLastStep(e) } > Siguente </div>
                <div className="btn-primary rounded-lg p1 mt1 pointer"  onClick={ (e) =>  handleStepTwo(e, false) } > Atras </div>
            </div>
        </div>  
        );

    return context;
}

export default ShippingProducts;