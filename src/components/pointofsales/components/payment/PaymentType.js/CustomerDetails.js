import React, { useEffect, useState } from "react";


const CustomerDetails = ({ handleCustomerDetails }) => { 

    const [customerName, setCustomername] = useState("");
    const [dui, setDui] = useState("");

    // Handle Customer Name 9 digits 8 digits before dash 1 after dash
    const handleName = (e) => {
        e.preventDefault();
        setCustomername(e.target.value);
    }

    const handleDUI = (e) => {
        e.preventDefault();
        setDui(e.target.value);
    }


    useEffect( () => {
        handleCustomerDetails({ "name": customerName, "dui": dui});
    }, [customerName, dui])

    // When Unmount reset state
    useEffect( () => {
       return()=> {
        setCustomername("");
        setDui("");
       }
    }, []);

  

    return (  
        <div className="payment-inputs-container"> 
            <div className="trandcode-wrapper cc-payment-wrapper">
                <label className="pymt-label" htmlFor="transactionCode">Nombre del Cliente: </label>
                <input  className="pymt-input"
                        autoComplete="off"
                        type="text"
                        required
                        name="customerName"
                        value={customerName}
                        onChange={e => handleName(e)}
                        placeholder="John Smith"
                />
            </div> 
            


            <div className="trandcode-wrapper cc-payment-wrapper">
                <label className="pymt-label" htmlFor="transactionCode">DUI: </label>
                <input  className="pymt-input"
                        autoComplete="off"
                        type="text"
                        name="dui"
                        required
                        value={dui}
                        onChange={e => handleDUI(e)}
                        placeholder="12345678-1"
                />
            </div>
            
            
            
         </div>
    );
}

export default CustomerDetails;