import React, { useState, useEffect, useRef }from "react";
import { Link, NavLink, useParams} from "react-router-dom";
import { connect } from 'react-redux';
import { load_varients } from '../actions/varients';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';


// component
import VarientItemList from "../components/VarientItemList";
import CreateVarientFormCon from "../components/CreateVarientFormCon";
import BarcodeGenerator from "../components/BarcodeGenerator";

//Styles
import "../static/css/pages/varient/varients.css"
import "../static/css/pages/varient/VarientItemList.css"
import "../static/css/pages/varient/createVarientFormCondense.css"

const Varients  = ({ load_varients, varients, isLoading}) => {

    const params = useParams();
    // Create Varient Condense Form
    const [popup, setpopup] = useState(false)
    const closePopupForm= e => { setpopup(false) }
    const openPopupForm = e => { setpopup(true) }

    const [varientData, setVarientData] = useState([])
    const componentRef = useRef();


    useEffect(() => {
      load_varients(params?.id);
    },[])

    useEffect(() => {
      if(!isLoading){
        setVarientData([...varients])
      }
    },[isLoading])

    return(
      <div id="varient-page-container">
        <h2> Varientes </h2>

          {/* <PDFViewer >
            {<BarcodeGenerator varientData={varientData} isLoading={isLoading} />}
          </PDFViewer> */}

        <div className="generate-barcode-button">
          
          <PDFDownloadLink document={ <BarcodeGenerator  varientData={varientData} isLoading={isLoading} /> } fileName="codigos"> 
            {  ({loading}) =>  loading ? 
                              (<button> Generando... </button> ):
                              (<button> Genera Etiquetas </button>)
            }
          </PDFDownloadLink>
        </div>


        {/* products */}
        <div className="product-container">
            <div className="varient-list-container">
           
                {
                  !isLoading ? 
                    varientData?.map( item => {
                      return <VarientItemList key={item.id} id={item.id} productId={params?.id} name={item.name} brand={item.brand}
                                               listed_price={item.listed_price} purchasePrice={item.purchase_price}
                                               size={item.size} units={item.units} sku={item.sku}/>
                    })
                  : <h1> LOADING</h1>
                }

                { popup ? <CreateVarientFormCon closePopupForm={closePopupForm}/> : null}

                <div onClick={openPopupForm} className="create-product-button-m"> 
                  <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" fill="currentColor" className="bi bi-plus" viewBox="-3 -3 20 20">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                  </svg>
                </div>
            </div>
        </div>
        
      </div>  
    )
}


const mapStateToProps = state => ({
  varients: state.varients.varients,
  isLoading: state.varients.isLoading
});


export default connect(mapStateToProps, {load_varients})(Varients);