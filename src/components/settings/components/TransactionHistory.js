import React, { useState, useEffect }from "react";
import { Link, NavLink } from "react-router-dom";
import { connect, useSelector } from 'react-redux';

import { useLazyGetTransactionsQuery } from "../../../features/dashboard/transactionsApiSlice";
// LocationInformation Here

const TransactionHistory  = () => {

    // turn this in to alazy
    const [getQuery, {data:transactionData, isLoading} ] = useLazyGetTransactionsQuery();


    const currentYear = new Date().getFullYear();
    const startYear = 2020;
    const years = Array.from({length: currentYear - startYear +1}, (_, i) => startYear + i);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
    
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [transactionTerminal, setTransactionTerminal] = useState("POS")

 
    const handleMonthChange = (event) => {
        setSelectedMonth(parseInt(event.target.value, 10));
    };
    const transactionFilterHandler = (event) => {
        setTransactionTerminal(event.target.value);
    };

    const handleChange = (event) => {
        const year = parseInt(event.target.value, 10);
        setSelectedYear(year);
    };
 
    const submit = () => {
        getQuery({ month:selectedMonth, year: selectedYear })
    }
    
    return(
      <div className="setting-half-window">
          {/* this  will have a month selector  */}
        <div className="date-selector">
            <div className="month-selector">
                <label htmlFor="month-select">Mes:</label>
                <select className="month-select rounded-lg" value={selectedMonth} onChange={handleMonthChange}>
                    {months.map((monthName, index) => (
                    <option key={index} value={index+1}>
                        {monthName}
                    </option>
                    ))}
                </select>
            </div>

            <div className="year-selector">
                <label htmlFor="year-select">Año:</label>
                <select className="year-select rounded-lg" value={selectedYear} onChange={handleChange}>
                    {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                    ))}
                </select>
            </div>

            <div className="rounded-lg pointer transactionhistory-button" onClick={submit}> Buscar </div>

            <div className="month-selector">
                <label htmlFor="month-select">Terminal:</label>
                <select className="month-select rounded-lg" value={transactionTerminal} onChange={transactionFilterHandler}>
                    <option value={"POS"}> POS </option>
                    <option value={"SHIPPING"}> ENVIOS </option>
                </select>
            </div>
        </div>

        <ul className="transaction-history"> 
            {
        
                transactionData?.filter(item => item?.paymentExecution == transactionTerminal)
                .map(item => {
                    return ( 
                    <li key={item?.id} className="transactions">
                        <p className="trans-info"> { item?.id} </p>
                        <p className="trans-info"> { item?.status} </p>
                        { item?.banktransfer.length !=0 && <p className="trans-info"> Transferencia </p>}
                        { item?.cash.length !=0 && <p className="trans-info"> Efectivo </p>}
                        { item?.creditcard.length !=0 && <p className="trans-info"> Targeta </p>}
                        <p className="trans-info"> { item?.dateCreated?.substring(0, 10)} </p>
                        <p className="trans-info"> { item?.dateCreated?.substring(11, 19)} </p>
                    </li>)
                })
            }
        </ul>
      </div>  
    )
}

export default TransactionHistory;



