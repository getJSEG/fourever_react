import React, { useState, useEffect }from "react";
import { useNavigate, useParams, useLocation, Link} from "react-router-dom";
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

// components 
import SearchCustomer from "./form/createNewPackages/SearchCustomer";
import CustomerForm from "./form/createNewPackages/CustomerForm";
import PackageInformation from "./form/createNewPackages/PackageInformation";
import ShippingProducts from "./form/createNewPackages/ShippingProducts";
import Loading from "../common/Loading";
import ErrorMessage from "../AlertMessage/ErrorMessage";

import { useCreateParcelMutation } from "../../features/shipping/shippingApiSlice";
import { useCreatePersonalizePackageMutation } from "../../features/shipping/shippingApiSlice";

const CreateShipping  = ({}) => {

    const { state } = useLocation();
    const shippingType = state;
    const navigate = useNavigate();

    const [ parcelShipping, { isLoading: isParcelLoading }] = useCreateParcelMutation();
    const [ personalShipping, { isLoading: isLoadingpersonal }] = useCreatePersonalizePackageMutation ();
    
    
    // this is to display the Phone look up when component loads
    const [customerSearch, setCustomerSearch] = useState(true);
    const [hasShippingType, setHasShippingType] = useState(false);
    const [phoneNumber, setPhoneNumber ] = useState(""); 
    const [errorMessage, setErrorMessage] = useState("");

    // these states hadle the window/component that are displayed if(true)
    const [stepOne, setStepOne] = useState(false);  // Displays Customer data
    const [stepTwo, setStepTwo] = useState(false);  // Displays Description and payment
    const [stepThree, setStepThree] = useState(false);  // Displays Package Content
    
    //Customer Data and Handlers
    const [customerData, setCustomerData] = useState({ firstName:"", lastName:"", email:"", countryCode:"503",
        phoneNumber: phoneNumber, address:"", extraDetails:"", department:"", municipality:"", country:"El salvador"
    });

    // Step 2 useEffects
    const [paymentType, setPaymentType] = useState('cash');
    const [paymentMethod, setPaymetMethod] = useState({});
    // top level object
    const [shippingDetails, setShippingDetails] = useState({ shippingType: shippingType?.shippingType,
        attempts: 1, companyName: 'Pedidos Express', details: '', weight:'1'});
    
    // Step 3
    const [shippingOrder, setShippingOrder] = useState({ tax: 0, discount: 0, shipping: 0, totalAmount: 0, OrderLine:[] });
    const [discount, setDiscount] = useState(0);
    const [shippingPrice, setShippingPrice] = useState(3.00);
    const [subtotal, setSubtotal] = useState(0);
    const [grandTotal, setTotalAmount] = useState(0);

    // All Products in packege
    const [shoppingCart, setShoppingCart] = useState([]);


    /* Hanlder Functions here */
    const errorMessageHandler = (message) => {
        setErrorMessage(message);
    }
    // handling the input field of the customer information
    const customerDataHandler = (e) => {
        e.preventDefault();
        const {name, value} =  e.target;
        setCustomerData( {...customerData, [name]: value });
    }
    // If cutomse exists then copy the retrived customer data in to the customer useState object
    const savedCustomerDataHandler = (existingCustomerData) => {
        setCustomerData({...customerData, ...existingCustomerData})
    }


    // Customer Data
    const handleStepOne = (e, isCustomerDataSaved) => {
        e.preventDefault();
        setStepOne(isCustomerDataSaved);
    }
    // Shipping Informatina nd paymet
    const handleStepTwo = (e, isStepTwo) => { setStepTwo(isStepTwo); }
    // package information
    const handleStepThree = (e, isStepThree) => { setStepThree(isStepThree); }

    // Phone numeber Hanlder
    const handlePhoneNumber = (e)=> {
        const {name, value} =  e.target
        // changin the customer data
        setPhoneNumber(value);
    }

    // This will handle The Phone Look for a customer at component loads
    const handleCustomerSearch = (isCustomer) => {
        console.log("this is th efunction that run outside")
        setCustomerSearch(isCustomer)
    }

    /*
        Step 2 Handlers Functions
    */

    // This handles the shipping information
    const shippingDetailHandler = (e) => {
        const {name, value} =  e.target;
        setShippingDetails( {...shippingDetails, [name]: value });
    }

    // this handles the payment option
    const paymentMethodHandler = (e) => {
        const {name, value} =  e.target;
        setPaymentType(value);
    }

    /* Step 3 handler Functions */

    const shippingPriceHandler = (e) => {
        const {name, value} =  e.target;
        const parsedFloat = parseFloat(value);

        if(parsedFloat < 0) { setShippingPrice(0);   }

        else if(!isNaN(parsedFloat)){ setShippingPrice(parsedFloat); }
    }
    // Change Quantity of the product in shopping cart
    const changeQTY = (indexValue , value) => {
        setShoppingCart(
            shoppingCart.map( (item, index) => 
                index === indexValue 
                ? 
                    value < 1 ? item : { ...item, quantity: value, subtotal: item?.price * value } 
                : item
            )
        );
    }


    // Check for Duplicates
    const isDuplicate = (sku) => {
        if(shoppingCart.length < 0)
            return -1;
        return shoppingCart.findIndex( obj => obj?.sku === sku);
    }
    
    // Add items to the shopping cart
    const shoppingCarthandler = (product) => {
        const index = isDuplicate(product?.sku);
  
        if(index !== -1){
            // if item already exist then just add one to the product if scanned or selected from the product selection window
            const increateUnitsByOne = shoppingCart[index]?.quantity + 1;
            changeQTY(index, increateUnitsByOne)
        }
        if(index === -1){
            // Add new item here
            setShoppingCart([...shoppingCart, {
                name: product?.product.name,
                sku: product?.sku,
                color: product?.color,
                size: product?.size,
                quantity: 1,
                price: parseFloat(product?.price),
                subtotal: parseFloat(product?.price)
            }]);
        }
    }

    // Adding one to the quantity
    const addOneQtyHandler = (index, quantity) => {
        changeQTY(index, quantity + 1)        
    }
    // Removing one from the quantity
    const removeOneQtyHandler = (index, quantity) => {
        changeQTY(index, quantity - 1);  
    }
    // This functions removes item from array by matching id/sku
    const removeItemFromCart = (id) => {
        setShoppingCart( prevShoppingCart => prevShoppingCart.filter( cartItem => cartItem?.sku !== id ))
    }
    
    /* UseEffect Below */
    
    // if receiptData is null or empty redirect to Point of sales data
    useEffect( () => {
        if(shippingType === null || shippingType === undefined) {
            navigate('/shipping', { replace: true });
        }else{
            setHasShippingType(true);
        }
    }, []);

    useEffect( () => { 
        setCustomerData({...customerData, phoneNumber: phoneNumber})
    }, [phoneNumber]);

    // calculates the total price of the products.
    useEffect( () => {
        let grandTotal = 0;
        let subtotal = shoppingCart.reduce((accumulator, item) => Number(item?.subtotal) + Number(accumulator), 0);
        grandTotal = shippingPrice + subtotal;

        setSubtotal(parseFloat(subtotal.toFixed(2)));
        setTotalAmount(parseFloat(grandTotal.toFixed(2)));

        setShippingOrder({...shippingOrder,
            shipping: parseFloat(shippingPrice.toFixed(2)),
            totalAmount: parseFloat(grandTotal.toFixed(2)),
            OrderLine: [...shoppingCart]
        })
        
    }, [shoppingCart, discount, grandTotal, shippingPrice]);


    useEffect( () => { 
        setPaymetMethod({
            ...paymentMethod,
            transactionType: paymentType,
            amount: paymentType == 'cash' ? 0 : grandTotal,
            changeDue: 0
        });
    }, [paymentType, grandTotal]);


    // Creating package depending on the type selected.
    const createPackage = async(packageCreation, object) => {
        try{
            const submitPackage = await packageCreation(object).unwrap();
    
            navigate('/shipping', { state: { successMessage: "Paquete fue creado exitosamente"}});
        }catch(err){
            errorMessageHandler(JSON.stringify(err?.data))
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const newObj = {
            ...shippingDetails,
            customer: { ...customerData },
            ...customerData,
            shippingOrder: {
                ...shippingOrder,
                ...(paymentType === "cash" && { cashPayment: { ...paymentMethod }}),
                ...(paymentType === "credit_card" && { ccPayment : { ...paymentMethod }}),
                ...(paymentType === "bank_transfer" && { btPayment: { ...paymentMethod }})
            }
        }

        console.log(newObj);

        if(shippingType?.shippingType === 'parcel') {
            createPackage(parcelShipping, newObj);
        } else{
            createPackage(personalShipping, newObj);
        }

    }

    // creating the number
    return (
        customerSearch 
        ? 
            hasShippingType
            ?
            <SearchCustomer handleCustomerSearch={ handleCustomerSearch } 
                            handlePhoneNumber= {handlePhoneNumber}
                            phoneNumber={phoneNumber}
                            savedCustomerDataHandler = { savedCustomerDataHandler }
                            /> 
            : <Loading />
        :
        <div className="main-container">
            
            {
                errorMessage && 
                <ErrorMessage 
                    message ={ errorMessage }
                    errorMessageHandler = { errorMessageHandler }
                />
            }

            <p className="page-title"> Creando { shippingType?.shippingType === "parcel" ? 'Encomienda' : "Personalisados"} </p>
            {/* Step one customer information */}
            { 
            !stepOne && !stepTwo && !stepThree
            ? 
                /* This will Apear only if the user does not exists */
                <CustomerForm 
                    handleCustomerData={ customerDataHandler }
                    customerData={ customerData }
                    saveCustomerData = { handleStepOne }
                    errorMessageHandler = { errorMessageHandler }
                />
            
            :
                <div> 
                    <div className="background-container mt1">
                        <h3> Paquete a Nombre De :  </h3>
                        <p> {`${customerData?.firstName} ${customerData?.lastName} `}</p>
                        <p> {`${phoneNumber} `}</p>
                    </div>

                    <div className="background-container mt1">
                        <h3> Destino :  </h3>
                        <p> {`${customerData?.department}, ${customerData?.municipality}, ${customerData?.country} `}</p>
                    </div>
                </div>  
            }

            {/* Step 2 Shipping Details of the shippment and payment*/}
            {
                stepOne && !stepTwo && !stepThree
                ? 
                    <PackageInformation 
                        handleStepTwo={ handleStepTwo }
                        handleStepOne={ handleStepOne }
                        shippingDetailHandler = { shippingDetailHandler }
                        paymentMethodHandler = { paymentMethodHandler }
                        shippingDetails = { shippingDetails }
                        paymentType = { paymentType }
                        totalItemInPackage = { shoppingCart?.length }
                    /> 
                :
                    (stepOne && stepTwo && stepThree ) || (stepOne && stepTwo && !stepThree)
                    ?   
                        <div> 
                                <div className="background-container mt1" >
                                    <h3> Extra Informacion Del Envio :  </h3>
                                    <p> {`${shippingDetails?.details} `}</p>
                                    <p> {`${shoppingCart?.length} `}</p>
                                </div>

                                <div className="background-container mt1" >
                                    <h3> Tipo de Pago :  </h3>
                                    <p> {`${paymentType?.replace("_", " ").toUpperCase()} `}</p>
                                </div>
                        </div> 
                    : null
            }

            {/* step 3 Products in Packege */}
            {
                stepOne && stepTwo && !stepThree
                ? 
                    <ShippingProducts 
                        handleStepThree = { handleStepThree }
                        handleStepTwo = { handleStepTwo }
                        handleShoppingCart = { shoppingCarthandler }
                        addOneQtyHandler = { addOneQtyHandler }
                        removeOneQtyHandler = { removeOneQtyHandler } 
                        removeItemFromCart = { removeItemFromCart }
                        shoppingCart = { shoppingCart }
                        discount = { discount }
                        shippingPrice = { shippingPrice }
                        subtotal = { subtotal }
                        grandTotal = { grandTotal }
                        shippingPriceHandler = { shippingPriceHandler }
                        errorMessageHandler = { errorMessageHandler }
            
                    />
                : 
                    stepOne && stepTwo && stepThree
                    ? 
                        <div className="background-container mt1"> 
                            <div>
                                <h3> Contenido del Paquete:  </h3>
                                <span className="mt1"> {shoppingCart?.map( (item, index) => (
                                    <li key={item?.sku} className="gray-bg-40 shipping-shopping-li mt1"> 
                                        <p> {item?.name} </p>
                                        <p> {item?.color} </p>
                                        <p> {item?.size} </p>
                                        <p> {item?.quantity} </p>
                                    </li>
                                ))}
                                </span>
                            </div>
                        </div> 
                    : null
            }

            {
                stepOne && stepTwo && stepThree
                ?
                    <div className="shipping-button-cont">
                        <div className="btn-primary rounded-lg p1 mt1 pointer"
                        onClick={ (e) =>  onSubmit(e)  } > Crear Paquete </div>
                        <div className="btn-primary rounded-lg p1 mt1 pointer"  onClick={ (e) =>  handleStepThree(e, false) } > Atras </div>
                    </div>
                : null
            }

        </div>  
    );
}

export default CreateShipping;