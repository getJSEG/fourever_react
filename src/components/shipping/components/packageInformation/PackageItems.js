import React, { useState, useEffect }from "react";
import { useNavigate, useParams, useLocation, Link} from "react-router-dom";
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

// components 
import { formatCurrecy } from "../../../../utils/currencyFormatter";


// TODO: add the information to the tems
const PackageItems  = ({isEditable, storeInventory, addOneQtyHandler, removeOneQtyHandler,
                        shoppingCart, removeItemFromCart, shoppingCarthandler
}) => {

    const [search, setSearch] = useState('');
    const [barcode, setBarcode] = useState('');


    const addProductWithScanner = () => {
        const filterProduct = storeInventory?.find( item => String(item?.sku).trim() === String(barcode).trim());
        
        if(filterProduct){
            shoppingCarthandler(filterProduct);
        }
        if(barcode !== '' && filterProduct == 0 ){
            console.log("El producto puede estar desactivador, o no se encuetra en el sistema")
        }
    }

    // clears search
    const clearSearch = () => { setSearch(''); }

    // make search
    const searchHandler = (e) => {
        const {name, value} =  e.target
        setSearch( value )
    }

    useEffect( () => {
        addProductWithScanner();
    }, [barcode]);

    // creating the number
    return (
        <div>

            {
                isEditable
                ?
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
                                    { (storeInventory?.filter( item =>
                                            item?.sku?.toLowerCase()?.indexOf(search.toLowerCase()) >= 0 ||
                                            item?.product?.name?.toLowerCase()?.indexOf(search.toLowerCase())  >= 0 
                                    
                                            )?.map( item=> {
                                                return  (<div  className="pointer shipping-searched-item " key={item?.id} onClick={ () =>{ shoppingCarthandler(item); clearSearch(); }}>
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
            :null
            }

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
                                {
                                    isEditable
                                    ?
                                        <div onClick={ () => removeItemFromCart(item?.id, item?.sku) }>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill pointer" viewBox="0 0 16 16">
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                            </svg> 
                                        </div>
                                    :null
                                }
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>  
    );
}

export default PackageItems;