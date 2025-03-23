import { useState, useEffect }from "react";
import { Link, NavLink } from "react-router-dom";

import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from "react-chartjs-2";

// API Calls
import Loading from "../common/Loading";
// import { Revenue } from "../../actions/dashboard/Dashboard";

// Custom Components
// import LowInventory from "./LowInventory";
// import TripleBoxInfo from "../common/TripleBoxInfo";
import LowInventory from "./LowInventory";
import Revenue from "./Revenue";
import TransactionHistory from "./TransactionHistory";

import { useGetExpensesQuery } from "../../features/dashboard/expensesApiSlice";

//Styles
import "../../static/css/pages/Dashboard.css"
// import "../../static/css/components/common/TripleBoxComponent.css"

const DashBoardPage  = () => {
    const {
        data: 
        expenses,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetExpensesQuery({ 'startDate':'01-01-2025', 'endDate':'02-10-2025'})


    console.log(expenses)

    // console.log("This is Is loading", isLoading)
    // print(data)
    // const [totalSalesOrder, setTotalSalesOrder] = useState(0)
    // const [lastOrderAmount, setLastOrderAmount] = useState(0)

    // useEffect( () => { Revenue(3); },[])

    // const handleSalesInfo = (e) => {
    //     Revenue(parseInt(e.target.value));
    // }

    // useEffect( () => {
    //     if(transactionHistoryData.length != 0){
    //         transactionHistoryData.map( (item) => {
    //             let amount =+ parseFloat(item.grandTotal).toFixed(2)
    //             setTotalSalesOrder(prev => prev + amount)
    //         });
    //         setLastOrderAmount(transactionHistoryData[transactionHistoryData.length-1].grandTotal);
    //     }
    // }, [transactionHistoryData])

    let content;

    // if (isLoading){
    //     content = <Loading />
    // }else if(isSuccess){
        content = (
            <section className="dashboard main-container">
               {/* <TripleBoxInfo
                titleOne={'Ventas De Hoy'} 
                titleTwo={'Ultima Order'} 
                titleTree={'Ordenes De Hoy'} 
                // infoOne={ '$' + parseFloat(totalSalesOrder).toFixed(2)} 
                // infoTwo={ '$' + parseFloat(lastOrderAmount).toFixed(2) }
                // infoThree={ transactionHistoryData.length }
                ></TripleBoxInfo> */}

                {/* Low Stock Level*/}
                <LowInventory/>

                <div className="chart-container">
                    {/* Revenue */}
                    <Revenue />
                    {/* Expenses */}
                </div>
                
   
                {/* Transaction */}
                <TransactionHistory></TransactionHistory>
            </section>
        )
    // }

    return content

    //   <div className="dashboard main-container">

    //     <TripleBoxInfo
    //     titleOne={'Ventas De Hoy'} 
    //     titleTwo={'Ultima Order'} 
    //     titleTree={'Ordenes De Hoy'} 
    //     // infoOne={ '$' + parseFloat(totalSalesOrder).toFixed(2)} 
    //     // infoTwo={ '$' + parseFloat(lastOrderAmount).toFixed(2) }
    //     // infoThree={ transactionHistoryData.length }
    //     ></TripleBoxInfo>

    //     {/* Top Item Sold */}
    //     {
    //         // lowStockData.length >= 0 ? <LowInventory/> : null
    //     }

    //     {/* Low Stock Warning */}

    //     <div className="chart-container">
            
    //         <div className="revenue-chart background-container chart-wrapper">
    //             <div className="chart-info">
    //                 <h3> Ventas </h3>
    //                 <div className="graph-selector-info">
    //                     <p>Mostrar por</p>
    //                     <select onChange={ (e) => handleSalesInfo(e) }  defaultValue="3" >
    //                         <option value="1"> Dia </option>
    //                         <option value="2"> Semana </option>
    //                         <option value="3" > Mes </option>
    //                     </select>
    //                 </div>
    //             </div>

    //             {/* {
    //                 !isLoading ? <Bar data= {{
    //                                         labels: revenueData.map( (data) => data.label ),
    //                                             datasets: [
    //                                                 {
    //                                                 label: "Ganacias",
    //                                                 data: revenueData.map( (data) => data.value ),
    //                                             }]
    //                                         }} />  : null
    //             } */}
    //         </div>

    //         <div className="background-container chart-wrapper">
    //             <div className="chart-info">
    //                 <h3> Gastos </h3>
    //                 <div className="graph-selector-info">
    //                     <p>Mostrar por</p>
    //                     <select></select>
    //                 </div>
    //             </div>

    //         </div>
    //     </div>

    //     {/* <TransactionHistory></TransactionHistory> */}
    //   </div>  
    
}


// const mapStateToProps = state => ({
//     revenueData: state.revenue.revenueData,
//     transactionHistoryData: state.transactionHistory.transactionHistoryData,
//     isLoading: state.revenue.isLoading,
//     lowStockData: state.lowInventory.lowStockData,
// });



export default DashBoardPage
// export default connect(mapStateToProps, {Revenue})(DashBoardPage);