import React, { useState, useEffect }from "react";

import { Chart as ChartJS } from 'chart.js/auto';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";

import { useGetExpensesQuery } from "../../../features/dashboard/expensesApiSlice";

const Expenses  = ({ getTotalExpenses }) => {

    const {
        data:
        expeseData,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetExpensesQuery();

    const handleOptionSelect = (e) => {
        e.preventDefault()
        setopt(Number(e.target.value))
    }

    useEffect(() => {
        getTotalExpenses(expeseData?.reduce((accumulator, currentValue) => accumulator + currentValue.gastos, 0));
    }, [expeseData])

    let content = isLoading ? <h3> Loading </h3> : ( <section className="chart-container">
          
          <div className="background-container">

                <h3 className='graph-title gray-txt-90'>Gastos Por Mes</h3>

                <div className="graph-title-divider"></div>

                <ResponsiveContainer width='100%' height={250}>
                    <AreaChart data={expeseData} margin={{ top: 15, right: 0, bottom: 15, left: 0 }}>
                        <Tooltip />
                        <XAxis dataKey='mes' />
                        <YAxis />
                        <CartesianGrid stroke='#ccc' strokeDasharray='1 1' />
                        <Legend />
                        <Area  type="monotone" dataKey='gastos' stroke="#94010c" fill="#b30713"/>
                    </AreaChart>
                </ResponsiveContainer>

          </div>
      </section>
      )

    return content
}

export default Expenses;