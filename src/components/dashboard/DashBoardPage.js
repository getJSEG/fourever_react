import { useState, useEffect }from "react";
import { Link, NavLink } from "react-router-dom";

import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from "react-chartjs-2";

// API Calls
import Loading from "../common/Loading";
import Revenue from "./component/Revenue";
import Expenses from "./component/Expenses";
import Sales from "./component/Sales";
import LowInventory from "./LowInventory";

import { useGetExpensesQuery } from "../../features/dashboard/expensesApiSlice";

//Styles
import "../../static/css/pages/Dashboard.css"

// Functions
import { useGetStockLevelQuery } from "../../features/dashboard/dashboardApiSlice";

const DashBoardPage  = () => {

    const [totalSales, setTotalSales] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);

    const { data: lowStock, isLoading } = useGetStockLevelQuery();

    const getTotalSales = (total) => {
        setTotalSales(total)
    }
    const getTotalExpenses = (total) => {
        setTotalExpenses(total)
    }

    let content;
        content = (
            <section className="dashboard main-container">
                <p className="page-title dashboard-title">  Actividad De Ventas </p>
                {/* This is the sales amount by category */}
                <Sales />

                <div className="graph-container">
                    <div className="graph-wrapper">
                        <Revenue getTotalSales={getTotalSales} />
                    </div>
                    
                    <div className="graph-wrapper">
                        <Expenses getTotalExpenses={getTotalExpenses}/>
                    </div>
                </div>

                <LowInventory />

                {/* Condense Shipping Information */}
                <div className="dashboard-information-container">

                    {/* Product Deatails */}
                    {/* <div className="product-details background-container">
                        <span className="line-divider"> </span>
                        
                        <div className="product-activity">

                            <div className="stock-level">   
                                <div className="stock-level-key">
                                   <p className="pt13"> Productos Con niveles bajos: <span className="text-color-red fw600"> { lowStock?.length } </span></p>
                                </div>
                                <div className="overflow-scroll height-10em">
                                    {
                                        lowStock?.map( item =>( 
                                            <Link className="pointer color-txt-blue remove-underline" key={item?.id} to={`/product/${item?.id}`}>  
                                                <p className="fw600 p-05" key={item?.id}> <span className="gray-txt-90">producto: </span>{ item?.name }: { item?.brand }</p> 
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                            
                        </div>
                    </div> */}
                    
                </div>
            </section>
        )
    // }

    return content

    
}

export default DashBoardPage
