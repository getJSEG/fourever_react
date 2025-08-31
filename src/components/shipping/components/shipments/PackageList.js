import React, { useState, useEffect }from "react";

import PackageListItems from "./PackageListItems";


const PackageList = ({packageList, shippingType, selectedRecentlyCreatedPackageList, isRecentlyCreatedView,
    selectedrecentlyCreatedPackageHandler, deletePackageHandler}) => {

    // This handles select single item ONLY if the user is is the recenlty created package view/window
    const singleSelectCheckboxHandler = (e) => {
        const id = e.target.value;  
        
        if(e.target.checked){
            let checkedItem = packageList.filter( item => item?.id === Number(id) )

            selectedrecentlyCreatedPackageHandler([...selectedRecentlyCreatedPackageList, { 
                "ORDEN": checkedItem[0].id,
                "NOMBRE": `${checkedItem[0]?.firstName} ${checkedItem[0]?.lastName}`,
                "TELEFONO": checkedItem[0]?.phoneNumber,
                "EMAIL": checkedItem[0]?.customer?.email,
                "DIRECCION": checkedItem[0]?.streetAddress,
                "MUNICIPIO": checkedItem[0]?.municipality,
                "DEPARTAMENTO": checkedItem[0]?.department,
                "PAIS":checkedItem[0]?.country,
                "CODIGO POSTAL": checkedItem[0]?.postalCode,
                "DESCRIPCION": checkedItem[0]?.addressLineTwo,
                "PESO": checkedItem[0]?.weight,
                "PRECIO": checkedItem[0]?.ShippingOrder?.totalAmount,
                "OBSERVACIONES": checkedItem[0]?.details
            }]);
        }else{
            selectedrecentlyCreatedPackageHandler(selectedRecentlyCreatedPackageList.filter( item => Number(item?.ORDEN) !== Number(id) ))
        }
    }

    return(
        <div>
            {
                packageList?.map( (item, index) => (
                    <PackageListItems 
                        customerName= {`${item?.firstName} ${item?.lastName}`} 
                        address = {`${ item?.department}, ${item?.municipality}`} 
                        totalAmount = { item?.shippingOrder?.totalAmount } 
                        dateCreated = { item?.shippingOrder?.dateCreated?.substring(5, 10)}
                        status = { item?.status  }
                        index = { index }
                        packageId = { item?.id } 
                        shippingType = { shippingType }
                        key = { index }
                        id = { item?.id }
                        packageDetails = { item }
                        isRecentlyCreatedView = { isRecentlyCreatedView }
                        singleSelectCheckboxHandler = { singleSelectCheckboxHandler }
                        selectedRecentlyCreatedPackageList = { selectedRecentlyCreatedPackageList }
                        deletePackageHandler = { deletePackageHandler }
                    />








                    // <ul className="shipping-list" key={index}>
                    //     <li className={`shipping-list-item p1 ${index === 0 ? '': 'mt1'}`}> 
                    //         <div className="pdl1 text-align-center "> {item?.customer?.firstName} {item?.customer?.lasrtName}</div>
                    //         <div className="text-align-center"> { item?.customer?.department}, {item?.customer?.municipality}</div>
                    //         <div className="text-align-center"> { item?.ShippingOrder?.totalAmount } </div>
                    //         <div className="text-align-center"> { item?.ShippingOrder?.dateCreated?.substring(5, 10)}</div>

                    //         <div className="pdr1">
                    //             <div onClick={ () => { setStatusVisible(!statusVisible) } } className="shipping-status pointer">
                    //                 <p className="pt10"> { item?.status } </p>
                    //             </div>
                    //             {
                    //                 statusVisible
                    //                 ?
                    //                 <div className="status-dropdown-continer">
                    //                     <div className="status-dropdown">
                    //                         {
                    //                             statusType?.map( (obj) => {
                    //                                 return Object.entries(obj).map( ([key, value]) => (
                    //                                     <option className="status-option-items pointer" key={key}> { value} </option>
                    //                                 ))
                    //                             })
                    //                         }
                    //                     </div>
                    //                 </div>
                    //                 : null
                    //             }
                    //         </div>

                    //     </li>
                    // </ul>
                ))
            }
        </div>
    );
}

export default PackageList;