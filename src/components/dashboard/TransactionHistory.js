import React, { useState, useEffect }from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from 'react-redux';

// API Calls
import { getTransactionHistory } from "../../actions/dashboard/Dashboard";

/*  */
const TransactionHistory  = ({ getTransactionHistory, transactionHistoryData, isLoading }) => {

    useEffect( () => {
        getTransactionHistory();
    },[])

    return(
        <div className="transaction-history-container">
            <h3> Historial de transacciones </h3>
            <div className="transactions-history-table-list">

                <table cellSpacing="0" cellPadding="0" className="transaction-history-table" >
                    <thead>
                        <tr>
                            <th>Numero de Orden</th>
                            <th>Horario</th>
                            <th>Cantidad</th>
                            <th >Tipo de pago</th>
                        </tr>
                    </thead>

                    <tbody className="transactions-history-list">

                        { 
                            !isLoading && transactionHistoryData.length !=0 ? (
                                transactionHistoryData.map( (item) => (
                                    <tr key={item.id}>
                                        <td scope="row">#{ item.order }</td>
                                        <td >{item.date_created}</td>
                                        <td >{ item.amount} </td>
                                        <td >{ item.transaction_type }</td>
                                    </tr>
                                ))
                            ): null

                        }
                    </tbody>
                </table>
    
            </div>
        </div>
    )
}


const mapStateToProps = state => ({
    transactionHistoryData: state.transactionHistory.transactionHistoryData,
    isLoading: state.transactionHistory.isLoading
    
});


export default connect(mapStateToProps, {getTransactionHistory})(TransactionHistory);