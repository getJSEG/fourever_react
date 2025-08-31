import React, { useState, useEffect }from "react";

import { Chart as ChartJS } from 'chart.js/auto';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";

import { useGetRevenueQuery } from "../../../features/dashboard/revenueApiSlice";
// Compoenents
import Loading from "../../common/Loading";



const Revenue  = ({getTotalSales}) => {

    // const data = [
    //     { "mes": "jan", "ventas": "100" },
    //     { "mes": "Feb", "ventas": "100" },
    //     { "mes": "Mar", "ventas": "100" },
    //     { "mes": "Apr", "ventas": "100" },
    //     { "mes": "May", "ventas": "0" },
    //     { "mes": "Jun", "ventas": "100" },
    //     { "mes": "July", "ventas": "300" },
    //     { "mes": "Augo", "ventas": "100" },
    //     { "mes": "sep", "ventas": "10" },
    //     { "mes": "Oct", "ventas": "100" },
    //     { "mes": "Nov", "ventas": "100" },
    //     { "mes": "Dec", "ventas": "200" },
    // ]

    const {
        data:
        revenueData,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetRevenueQuery();

    const handleOptionSelect = (e) => {
        e.preventDefault()
        setopt(Number(e.target.value))
    }

    useEffect(() => {
        getTotalSales(revenueData?.reduce((accumulator, currentValue) => accumulator + currentValue.Ventas, 0));
    }, [revenueData])

    let content = isLoading ? <Loading /> : ( <section className="chart-container">
          
          <div className="background-container">

                <h3 className='graph-title gray-txt-90'>Ventas Por Mes</h3>

                <div className="graph-title-divider"> </div>

                <ResponsiveContainer width='100%' height={250}>
                    <AreaChart data={revenueData} margin={{ top: 15, right: 0, bottom: 15, left: 0 }}>
                        <Tooltip />
                        <XAxis dataKey='mes' />
                        <YAxis />
                        <CartesianGrid stroke='#e8e8e8' strokeDasharray='1' />
                        <Legend />
                        <Area  type="monotone"  dataKey='ventas' stroke="#1265ac" fill="#1265ac99"  />
                    </AreaChart>
                </ResponsiveContainer>

          </div>
      </section>
      )

    return content
}

export default Revenue;