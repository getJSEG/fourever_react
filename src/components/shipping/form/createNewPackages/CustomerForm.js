import React, { useState, useEffect }from "react";

// this is all of the departments and municipalities object
import { allLocations } from "../../../../utils/utilsdata";

const CustomerForm  = ({handleCustomerData, customerData, saveCustomerData, errorMessageHandler}) => {

    const [municipalities, setMunicipalities] = useState([]);

    const moveToNext = (e) => {
        if((customerData?.firstName !== "" && customerData?.firstName !== undefined) && (customerData?.address !== "" && customerData?.address !== undefined) &&
            (customerData?.department !== "" && customerData?.department !== undefined) && (customerData?.municipality !== "" && customerData?.municipality !== undefined) ){
            saveCustomerData(e, true);
         }else{
            errorMessageHandler("Todos los campos con asterisco rojos deben llenarse")
         }
    }

    useEffect( () => {
        const filteredDepartment = allLocations?.filter( item => item?.nombre === customerData?.department)
        setMunicipalities(filteredDepartment[0]?.municipios)
    }, [customerData?.department]);

    return (
        <div>  
            <div className="background-container shipping-inputs-container">
                <p className="pdb1"> Informacion del Cliente</p>

                <div className="p-05 shipping-inputs-wrapper">
                    <div className="pdr1 width-10">
                        <label htmlFor="firstName" className="pdr2"> Nombre <span className="required">*</span> </label>
                    </div>
                    <div className="width-50">
                        <input
                            className="form-inputs p1 width-100 rounded-lg"
                            id="firstName"
                            name="firstName"
                            required
                            placeholder="John"
                            type="text" 
                            autoComplete="off"
                            onChange={e => handleCustomerData(e)}
                            value={customerData.firstName}></input>
                    </div>
                </div>

                <div className="p-05 shipping-inputs-wrapper">
                    <div className="pdr1 width-10">
                        <label htmlFor="lastName" className="pdr2">  Apellido </label>
                    </div>
                    <div className="width-50">
                        <input
                            className="form-inputs p1 width-100 rounded-lg"
                            id="lastName"
                            name="lastName"
                            placeholder="Smith"
                            type="text" 
                            autoComplete="off"
                            onChange={e => handleCustomerData(e)}
                            value={customerData.lastName}></input>
                    </div>
                </div>

                <div className="p-05 shipping-inputs-wrapper">
                    <div className="pdr1 width-10">
                        <label htmlFor="email" className="pdr2"> Coreo </label>
                    </div>
                    <div className="width-50">
                        <input
                            className="form-inputs p1 width-100 rounded-lg"
                            id="email"
                            name="email"
                            placeholder="example@gmail.com"
                            type="text" 
                            autoComplete="off"
                            onChange={e => handleCustomerData(e)}
                            value={customerData.email}></input>
                    </div>
                </div>

                <div className="p-05 shipping-inputs-wrapper">
                    <div className="pdr1 width-10">
                        <label htmlFor="address" > Dirección <span className="required">*</span> </label>
                    </div>
                    
                    <div className="width-50">
                        <input
                            className="form-inputs p1 width-100 rounded-lg"
                            id="address"
                            name="address"
                            required
                            placeholder="Casa 3"
                            type="text" 
                            autoComplete="off"
                            onChange={e => handleCustomerData(e)}
                            value={customerData.address}></input>
                    </div>
                </div>

                <div className="p-05 shipping-inputs-wrapper">
                    <div className="pdr1 width-10">
                        <label htmlFor="extraDetails" className="pdr2" > Referencia </label>
                    </div>
                    <div className="width-50">
                        <input
                            className="form-inputs p1 width-100 rounded-lg"
                            id="extraDetails"
                            name="extraDetails"
                            placeholder="Casa 3"
                            type="text" 
                            autoComplete="off"
                            onChange={e => handleCustomerData(e)}
                            value={customerData.extraDetails}></input>
                    </div>
                </div>

                <div className="p-05 shipping-inputs-wrapper">
                    <div className="pdr1 width-10">
                        <label htmlFor="department" className="pdr2"> Departamento <span className="required"> *</span> </label>
                    </div>

                    <div className="width-50">
                        <select value={customerData.department} 
                                id="department"
                                name="department"
                                onChange={ e => handleCustomerData(e) }
                                className="form-inputs p1 width-100 rounded-lg">
                            <option value="" disabled>Selecciona </option>

                            {
                                allLocations?.map( item => {
                                    return <option className="pt15" value={item?.nombre} key={item?.id}> { item?.nombre } </option>
                                })
                            }
                        </select>
                    </div>
                </div>


                {
                    customerData?.department
                    ?(<div className="p-05 shipping-inputs-wrapper">
                            <div className="pdr1 width-10">
                                <label htmlFor="municipality" className="pdr2" > Municipio <span className="required"> * </span> </label>
                            </div>

                            <div className="width-50">
                                <select value={customerData.municipality} 
                                        id="municipality"
                                        required
                                        name="municipality"
                                        onChange={ e => handleCustomerData(e) }
                                        className="form-inputs p1 width-100 rounded-lg">
                                    <option value="" disabled>Selecciona </option>

                                    {
                                        municipalities?.map( item => (
                                            <option className="pt15"  value={item?.nombre} key={item?.id_mun}> { item?.nombre } </option>
                                        ))
                                    }
                                    
                                </select>
                            </div>
                        </div> )
                    : null
                }

            </div>

            <div className="shipping-button-cont">
                <div className="btn-primary rounded-lg p1 mt1 pointer" 
                    onClick={ (e) => moveToNext(e) }> Siguiente </div>
            </div>

      </div>  
    );
}

export default CustomerForm;