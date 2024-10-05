import React, { useState, useEffect }from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from 'react-redux';

import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from "react-chartjs-2";

// API Calls
import { Revenue } from "../actions/dashboard/Dashboard";

// Custom Components
import LowInventory from "../components/dashboard/LowInventory";
import TripleBoxInfo from "../components/common/TripleBoxInfo";
import TransactionHistory from "../components/dashboard/TransactionHistory";

//Styles
import "../static/css/pages/Dashboard.css"
import "../static/css/components/dashboard/lowInventory.css"
import "../static/css/components/dashboard/transactionHistory.css"
import "../static/css/components/common/TripleBoxComponent.css"

const Dashboard  = ({ Revenue, revenueData, isLoading, transactionHistoryData}) => {

    const [totalSalesOrder, setTotalSalesOrder] = useState(0)
    const [lastOrderAmount, setLastOrderAmount] = useState(0)

    useEffect( () => {
        Revenue(3);
    },[])

    const handleSalesInfo = (e) => {
        Revenue(parseInt(e.target.value));
    }

    useEffect( () => {
        if(transactionHistoryData.length != 0){
            transactionHistoryData.map( (item) => {
                let amount = +parseFloat(item.amount).toFixed(2)
                setTotalSalesOrder(prev => prev + amount)
            });
            setLastOrderAmount(transactionHistoryData[transactionHistoryData.length-1].amount);
        }

    
    }, [transactionHistoryData])

    return(
      <div className="dashboard main-container">

        <TripleBoxInfo
        titleOne={'Ventas De Hoy'} 
        titleTwo={'Ultima Order'} 
        titleTree={'Ordenes De Hoy'} 
        infoOne={ '$' + parseFloat(totalSalesOrder).toFixed(2)} 
        infoTwo={ '$' + parseFloat(lastOrderAmount).toFixed(2) }
        infoThree={ transactionHistoryData.length }
        ></TripleBoxInfo>

        {/* Top Item Sold */}
        <LowInventory/>

        {/* Low Stock Warning */}

        <div className="chart-container">

            <div className="revenue-chart chart-wrapper">
                <div className="chart-info">
                    <h3> Ventas y Gastos</h3>
                    <div className="graph-selector-info">
                        <p>Mostrar por</p>
                        <select onChange={ (e) => handleSalesInfo(e) }
                                defaultValue="3"
                        >
                            <option value="1"> Dia </option>
                            <option value="2"> Semana </option>
                            <option value="3" > Año </option>
                        </select>
                    </div>
                </div>

                {
                    !isLoading ? <Bar data= {{
                                            labels: revenueData.map( (data) => data.label ),
                                                datasets: [
                                                    {
                                                    label: "Ganacias",
                                                    data: revenueData.map( (data) => data.value ),
                                                }]
                                            }} />  : null
                }
            </div>

            <div className="-chart chart-wrapper">
                <div className="chart-info">
                    <h3> Gatos </h3>
                    <div className="graph-selector-info">
                        <p>Mostrar por</p>
                        <select></select>
                    </div>
                </div>

            </div>
        </div>

        <TransactionHistory> 
        </TransactionHistory>
      </div>  
    )
}


const mapStateToProps = state => ({
    revenueData: state.revenue.revenueData,
    transactionHistoryData: state.transactionHistory.transactionHistoryData,
    isLoading: state.revenue.isLoading,
});


export default connect(mapStateToProps, {Revenue})(Dashboard);