import React, { useState, useEffect }from "react";
import { useNavigate, useParams, useLocation, Link} from "react-router-dom";

// Api call
import { useUpdateParcelMutation } from "../../../../features/shipping/shippingApiSlice";
import { useUpdatePersonalizePackageMutation } from "../../../../features/shipping/shippingApiSlice";
import { useGetPosProductsQuery } from "../../../../features/pos/posApiSlice";
import { useDeleteParcelMutation } from "../../../../features/shipping/shippingApiSlice.js";
import { useDeletePersonalizePackageMutation } from "../../../../features/shipping/shippingApiSlice.js";


import PackageEditForm from "./PackageEditForm";
import ConfirmationWindow from "../../../cofirmationWindow/ConfirmationWindow.js";

const PackageInformation = ({ packageDetails, shippingType, refetch, isRefetch,  deletePackage, deleteConfirmation, deletePackageMutation,  deleteConfirmationHandler, errorMessageHandler, successMessageHandler }) => {
    
    const { data: storeInventory, isLoading } = useGetPosProductsQuery();
    const [ parcelShipping, { isLoading: isLoadingCustom }] = useUpdateParcelMutation();
    const [ personalShipping, { isLoading: isLoadingpersonal }] = useUpdatePersonalizePackageMutation();

    const [isEditable, setIsEditable] = useState(false);

    // this state is to confirm the user that it will only change this Package Information and no other information
    const [CustomerDataEdited, setCustomerDataEdited] = useState(false);
    const [customerData, setCustomerData] = useState({ firstName:"", lastName: "", email: "", countryCode: "", phoneNumber: "", streetAddress: "", addressLineTwo: "", department: "", municipality: "", country: "", shippingType: "", attempts: "", companyName: "", details: "", weight:"", status:""});
    const [shippingOrder, setShippingOrder] = useState({ tax: 0, discount: 0, shipping:  0, totalAmount: 0, OrderLine:[], status:"" });

    
    // getting all of the information from the backend and coping it to the useState to be able to edit
    const addingInformation = () => {
        const tempCustomerInformation = {};
        const tempShippingOrder = {};

        if(packageDetails){
            // This copies the Customer information only
            // if the information from the top level customer item are null the go into the lower lever of customer data
            Object.entries(packageDetails).forEach(([key, value]) => {
                // copying all of the items fromt he shipping order 
                Object.entries(packageDetails?.shippingOrder).forEach(([name, val]) => {
                    if(name in shippingOrder) {
                        tempShippingOrder[name] = val
                    }
                });
                
                if( key in customerData ){
                    if(value == "" || value == null){
                        tempCustomerInformation[key] = packageDetails.customer[key]
                    }else{
                        tempCustomerInformation[key] = value;
                    }
                }
               
            });
            setShippingOrder({...tempShippingOrder})
            setCustomerData({ ...tempCustomerInformation });
        }
    }

    // this toggles the edit form of the package information
    const editButtonHandler = (edit) => {
        setIsEditable(edit);
        refetch(!edit);
    }

    // Chnagint the  untis and updating the customer Total
    const changeQTY = (indexValue , value) => {
        setShippingOrder(prevItems => {
            let total = 0;
            let shipping = Number(prevItems?.shipping)
            let newProducts =  prevItems.OrderLine.map( (item, index) =>{

                if(index === indexValue ){
                    total = total + (Number(item?.price) * Number(value))
                    return { ...item, quantity: value, subtotal:(Number(item?.price) * Number(value)).toFixed(2) }
                }else{
                    total = total + item?.subtotal
                    return item
                } 
            });
            return {
               ...prevItems,
               totalAmount: (Number(total) + Number(shipping)).toFixed(2),
               OrderLine: newProducts
            }
        });
    }

    // Check for Duplicates
    const isDuplicate = (sku) => {
        if(shippingOrder?.OrderLine.length < 0)
            return -1;
        return shippingOrder?.OrderLine.findIndex( obj => obj?.sku === sku);
    }

    // Adding Items/Products to the "shoppingcart"/package
    const shoppingCarthandler = (product) => {
        const index = isDuplicate(product?.sku);
  
        if(index !== -1){
            // if Product Exist get the unit and add one to it
            const increateUnitsByOne = shippingOrder.OrderLine[index]?.quantity + 1;
            changeQTY(index, increateUnitsByOne);
        }
        if(index === -1){
            //Adding new products to Orderl Line
            setShippingOrder(prevItems => ({
                ...prevItems,
                totalAmount: Number(parseFloat(prevItems?.totalAmount) + parseFloat(product?.price)).toFixed(2),
                OrderLine:[ ...prevItems.OrderLine, {
                        name: product?.product.name,
                        sku: product?.sku,
                        color: product?.color,
                        size: product?.size,
                        quantity: 1,
                        price: parseFloat(product?.price),
                        subtotal: parseFloat(product?.price)} 
                ]
            }));
        }
    }

    // this removes item from shopping cart that has been added and does not exist in teh back end
    const removeItemFromCartFrontEnd = (sku) => {
        const updatedArray =  shippingOrder?.OrderLine.filter(item => item.sku !== sku);
        setShippingOrder({...shippingOrder, OrderLine: updatedArray})
    }

    // deletes items from cart
    const removeItemFromCart =  async (id, sku) => {
        const order = packageDetails?.shippingOrder?.id;
        const package_id = packageDetails?.id;

        if(typeof id === "undefined") {
            // remove item from teh shopping cart
            removeItemFromCartFrontEnd(sku)
        }else {
            if( packageDetails?.shippingOrder?.OrderLine.length !== shippingOrder?.OrderLine.length) {
                errorMessageHandler("Tus cambios no se han guardado, guarde el paquete antes de eliminar este producto.");
            } else if (packageDetails?.shippingOrder?.OrderLine.length == 1){
                errorMessageHandler("No  se puede borrar, Al menos 1 producto debe estar en el paquete");
            } else{try {
                await deletePackageMutation({ id:package_id, orderId: order, lineItem:id }).unwrap();
                successMessageHandler("el producto fue borrado")
            }
            catch (err) {
                errorMessageHandler(JSON.stringify(err?.data))
            }}
        }
    }

    // Adding one to the item in shopping cart
    const addOneQtyHandler = (index, quantity) => {
        changeQTY(index, quantity + 1)        
    }
    // Removing qty of one(1) item in shopping cart
    const removeOneQtyHandler = (index, quantity) => {
        if(quantity <= 1){
            changeQTY(index, 1);  
        }else{
            changeQTY(index, quantity - 1);  
        }
        
    }

    // this handles all of the package change
    const customerDataHandler = (e) => {
        e.preventDefault();
        const {name, value} =  e.target;
        setCustomerData( {...customerData, [name]: value });
    }

    const shippingOrderHandler = (e) => {
        e.preventDefault();
        const {name, value} = e.target
        setShippingOrder({...shippingOrder, [name]: value });
    }

    

    // this is what submits the object to the back end and handles errors
    const submitPackage = async (packageSubmit, data, id) => {
        try{
            const submitPkg = await packageSubmit({id, data}).unwrap();
            // refetch();
            successMessageHandler("El paquete se actualizó exitosamente.");
        }catch(err){
            errorMessageHandler(JSON.stringify(err?.data))
        }
    }

    // This submits to the backend
    const saveChanges = async () =>{
        // combining all of the data information
        const data = {
            ...customerData,
            shippingOrder: {
                ...shippingOrder,
                // paymentMethod: { ...paymentMethod }
            }
        }
        // this check the shipping type to correctly send the information to the correct url route
        if( shippingType === "custom"){
            const id = packageDetails?.id
            submitPackage(personalShipping, data, id);
        } else{
            const id = packageDetails?.id
            submitPackage(parcelShipping, data, id);
        }
    }

    // every time that the Orderline is updated the total amount is updated as well
    useEffect( () => {
        const sum = shippingOrder?.OrderLine.reduce((accumulator, currentValue) => { return parseFloat(accumulator) + parseFloat(currentValue?.subtotal)}, 0);
        setShippingOrder({...shippingOrder, totalAmount: sum + parseFloat(shippingOrder?.shipping)})
    }, [shippingOrder?.OrderLine])


    // constanly checking any information that has chage
    useEffect( () => {
        setCustomerDataEdited(true);
    }, [customerData]);
    
    useEffect ( () => { 
        addingInformation(); 
    }, [ packageDetails, isRefetch ]);

    return(
        <div className="main-container">
            <p className="page-title"> Informacion del Paquete </p>

            {
                deleteConfirmation && <ConfirmationWindow 
                    message = {"Quieres Borrar el Paquete"}
                    handleCloseWindow = { () => deleteConfirmationHandler() }
                    handleConfirmartion = { () => deletePackage() }  
                />
            }

            <div >
                <div className="shipping-editable-btn-container">
                    <Link to="/shipping" className="variant-btn btn-primary pointer rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-short" viewBox="3 4 9 8">
                            <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
                        </svg>
                    </Link>

                    <div className="shipping-editable-btn-container">
                    { isEditable ? 
                        <button onClick={(e) => { editButtonHandler(false); saveChanges();} } className="variant-btn btn-primary pointer rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-floppy2-fill" viewBox="0 0 16 16">
                                <path d="M12 2h-2v3h2z"/>
                                <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5v13A1.5 1.5 0 0 0 1.5 16h13a1.5 1.5 0 0 0 1.5-1.5V2.914a1.5 1.5 0 0 0-.44-1.06L14.147.439A1.5 1.5 0 0 0 13.086 0zM4 6a1 1 0 0 1-1-1V1h10v4a1 1 0 0 1-1 1zM3 9h10a1 1 0 0 1 1 1v5H2v-5a1 1 0 0 1 1-1"/>
                            </svg>
                        </button>
                        : 
                        <button onClick={(e) => { editButtonHandler(true); } } className="variant-btn btn-primary pointer rounded-lg"> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="varient-list-svg" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                            </svg>
                        </button> }

                        <div className="pos-cancel-button red-bg-color rounded-lg">
                            <button onClick={ () => deleteConfirmationHandler(true) }
                                    className="red-bg-color gray-txt-20"> 
                                    BORRAR 
                            </button>
                        </div>
                    </div>
                        
                </div>
            </div>

            <PackageEditForm 
                packageDetails={ packageDetails }
                isEditable = { isEditable }
                customerDataHandler = { customerDataHandler }
                customerData = { customerData }
                shippingType = { shippingType }
                storeInventory = { storeInventory }
                shoppingCart = { shippingOrder?.OrderLine }
                removeItemFromCart = { removeItemFromCart }
                shoppingCarthandler = { shoppingCarthandler }
                addOneQtyHandler = { addOneQtyHandler }
                removeOneQtyHandler = { removeOneQtyHandler }
                shippingOrderHandler = { shippingOrderHandler }
                shippingOrder = { shippingOrder }
            />

        </div>
    );
}

export default PackageInformation;