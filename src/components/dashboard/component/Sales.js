import React, { useState, useEffect }from "react";

import { useGetSalesQuery } from "../../../features/dashboard/salesApiSlice";

// TODO: CREATE A LOADING FOR EACH ROUTE
import Loading from "../../common/Loading";
import { formatCurrecy } from "../../../utils/currencyFormatter";

const Sales  = ({}) => {
    
    const [option, setOption] = useState(1);

    const { data: sales, 
            isLoading,
            isSuccess,
            isError,
            error
     } = useGetSalesQuery(option);


    const handleChange = (e) => {
        const {name, value} =  e.target;
        setOption(value);
    }

    let content = isLoading ? <Loading /> : ( 
    <section className="chart-container">

        <div className="sales-selector">
            <select
                className="form-inputs p1 rounded-lg"
                value={option}
                onChange={e => handleChange(e) }
                >
                <option value="1"> Dia </option>
                <option value="2"> Mes </option>
                <option value="4"> Año </option>
            </select>
        </div>          
         <div className="store-summary outlinetemplate">

            <div className="sales-view div-background-color-white div-border-blue-gray-color">
                <p className="summary-decription text-color-dark-gray"> Ventas Total </p>
                <p className="summary-data gray-txt-90"> {formatCurrecy(sales?.totalStoreRevenue || 0)} </p>
                
            </div>

            <div className="sales-view div-background-color-white div-border-blue-gray-color">
                <p className="summary-decription text-color-dark-gray" > Envios </p>
                <p className="summary-data gray-txt-90" > {formatCurrecy(sales?.shippingRevenue || 0)} </p>
                
            </div>

            <div className="sales-view div-background-color-white div-border-blue-gray-color">
                <p className="summary-decription text-color-dark-gray fw-500" > Tienda </p>
                <p className="summary-data gray-txt-90" > {formatCurrecy(sales?.storeRevenue || 0)} </p>
            </div>

        </div>
      </section>
      )

    return content
}

export default Sales;