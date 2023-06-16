import React, { useContext, useLayoutEffect, useState } from 'react'


import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { CryptoContext } from '../context/CryptoContext';

function CustomTooltip({ payload, label, active, currency= "usd" }) {
    if (active && payload && payload.length > 0) {
        return (
            <div className="custom-tooltip">
            <p className="label text-sm text-cyan">{`${label} : ${   
                new Intl.NumberFormat("en-US",{
                    style: "currency",
                    currency: currency,
                    minimumFractionDigits: 5,
                    }).format(payload[0].value)
                }`}</p>
            </div>
        );
        }
    
        return null;
    }

const ChartComponent = ({data, currency, type}) => {
    return (
        <ResponsiveContainer height={"90%"} >
            <LineChart width={400} height={400} data={data}>
            <Line type="monotone" dataKey={type} stroke="#25da72" strokeWidth={"1px"} />
            <CartesianGrid stroke="#323232" />
            <XAxis dataKey="date" hide />
            <YAxis dataKey="prices" hide domain={["auto","auto"]} />
            <Tooltip content={<CustomTooltip />} currency={currency} cursor={false} wrapperStyle={{outline: "none"}} />
            <Legend />
        </LineChart>
        </ResponsiveContainer>
    )
}

const Chart = ({id}) => {
    const [chartData, setChartData] = useState()
    let {currency} = useContext(CryptoContext)
    const [type, setType] = useState("prices")

    useLayoutEffect(() => {
    const getChartData = async (id) => {

            try{

                const data = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily`
                ).then(res => res.json()).then(json => json) 

                let convertedData = data[type].map(item => 
                    {
                        return{
                            date: new Date(item[0]).toLocaleDateString(),
                            [type]: item[1],
                        }
                    }
                )
    
                setChartData(convertedData)
            }catch(error){
                console.log(error)
            } 
    } 

    getChartData(id)

    }, [id, type])

    return (
        <div className='w-full h-[60%]'>
            <ChartComponent data={chartData} currency={currency} type={type} />
            <div className='flex'>
                <button onClick={() => setType("prices")}>Price</button>
                <button onClick={() => setType("market_caps")}>market caps</button>
                <button onClick={() => setType("total_volumes")}>total volumes</button>
            </div>
        </div>
    )
}

export default Chart