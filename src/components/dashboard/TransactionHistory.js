import React, { useState, useEffect }from "react";
import { Link, NavLink } from "react-router-dom";

import { useGetTransactionsQuery } from "../../features/dashboard/transactionsApiSlice";
import Loading from "../common/Loading";
// API Calls
// TODO: When data is emptu the create compoenet saying no data
// Veiryfy it does not crash if the dta is empty

//Utils
import { formatCurrecy } from "../../utils/currencyFormatter";
const TransactionHistory  = () => {

    const {
        data: 
        transactions,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTransactionsQuery();

    // console.log("This is Low stock level: ", transactions)
    // console.log(isLoading)
    // const [currentPage, setCurrentPage] = useState(1);
    // const [totalItems, setTotalItems] = useState(transactionHistoryData?.length);
    // const [itemperPage, setItemsPerPafe] = useState(5);

    // // Subset the items mapping
    // let subset =  transactions?.slice((currentPage*itemperPage)-itemperPage, currentPage*itemperPage);

    // const getCurrentPage = (childCurrentPage) => { setCurrentPage(childCurrentPage) }
  
    // useEffect( () => {  getTransactionHistory(); },[])

    // useEffect( () => {  
    //     setTotalItems(transactionHistoryData?.length || 0 );
    // },[totalItems, transactionHistoryData])


    let content =  isLoading ? <Loading /> :((
            <section className="background-container transaction-history"> 
                <h3 className="trans-title"> Historial de Transacciones </h3>

                <div className="trans-table-wrapper">

                    <table cellSpacing="0" cellPadding="0" className="trans-hist-table" >
                        <thead className="trans-table-head">
                            <tr className="table-head-row">
                                <th>ID de la Orden</th>
                                <th>Dia</th>
                                <th>Monto</th>
                                <th>status </th>
                                <th>Tipo de pago</th>
                            </tr>
                        </thead>

                        <tbody className="trans-table-list">
                        {
                        transactions?.map( (item) => (
                            <tr  className="trans-table-row" key={item.id}>
                                <td className="item-info">#{ item?.order }</td>
                                <td className="item-info">{ item?.date }</td>
                                <td className="item-info">{ formatCurrecy(item?.grandTotal || 0)} </td>
                                <td className="item-info"> <div className={`trans-status ${ item?.status === "successful" ? 'status-success': 'status-fail'} `}> {item?.status } </div></td>
                                <td className="item-info" >{ item?.transaction_type.replace(/_/g, ' ') }</td>
                            </tr>
                            
                        ))}
                        </tbody>
                    </table>
                </div>
                {
                    // transactions?.length >= 4  ? (<Pagination 
                    //                                             getCurrentPage={getCurrentPage} 
                    //                                             totalItems = {totalItems}
                    //                                             itemPerPage={itemperPage}
                    //                                         />) : null
                }
            </section>
        ))
    // } else if( isError ) {
    //     content = ( <P> {JSON.stringify(error)} </P>)
    // }

    return content

    // return(
    //     <div className="background-container transaction-history">
    //         <h3 className="trans-title"> Historial de Transacciones </h3>

    //         <div className="trans-table-wrapper">

    //             <table cellSpacing="0" cellPadding="0" className="trans-hist-table" >
    //                 <thead className="trans-table-head">
    //                     <tr className="table-head-row">
    //                         <th>ID de Orden</th>
    //                         <th>Horario</th>
    //                         <th>Cantidad</th>
    //                         <th>status </th>
    //                         <th>Tipo de pago</th>
    //                     </tr>
    //                 </thead>

    //                 <tbody className="trans-table-list">
    //                     { 
    //                         !isLoading && subset?.length != 0 ? (
    //                             subset?.map( (item) => (
    //                                 <tr  className="trans-table-row" key={item.id}>
    //                                     <td className="item-info">#{ item?.order }</td>
    //                                     <td className="item-info">{ item?.date_created }</td>
    //                                     <td className="item-info">{ formatCurrecy(item?.grandTotal || 0)} </td>
    //                                     <td className="item-info"> <div className={`trans-status ${ item?.status === "successful" ? 'status-success': 'status-fail'} `}> {item?.status } </div></td>
    //                                     <td className="item-info" >{ item?.transaction_type.replace(/_/g, ' ') }</td>
    //                                 </tr>
                                    
    //                             ))
    //                         ): null

    //                     }
    //                 </tbody>
    //             </table>
    //         </div>
    //         {
    //             transactionHistoryData?.length >= 4  ? (<Pagination 
    //                                                         getCurrentPage={getCurrentPage} 
    //                                                         totalItems = {totalItems}
    //                                                         itemPerPage={itemperPage}
    //                                                     />) : null
    //         }
            
    //     </div>
    // )
}


// const mapStateToProps = state => ({
//     transactionHistoryData: state.transactionHistory.transactionHistoryData,
//     isLoading: state.transactionHistory.isLoading
    
// });


export default TransactionHistory;