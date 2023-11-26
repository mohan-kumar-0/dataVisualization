import { useEffect,useState } from "react";
import {Bar} from 'react-chartjs-2';
import data from './../Dataset/abc.csv';
import Papa from 'papaparse';
import {Chart as ChartJs,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend} from 'chart.js';

ChartJs.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);

export default function BarGraph(maxSize) {

    const [chartData,setChartData] = useState({
        datasets:[]
    });
    const [chartOption,setChartOptions] = useState({});

    useEffect(() => {
        Papa.parse(data,{
            download:true,
            header:true,
            dynamicTyping:true,
            delimiter:'',
            complete: ((result) => {
                setChartData({
                    labels:result.data.slice(0,maxSize).map((row)=>row.commodity).filter(String),
                    datasets: [
                        {
                            label: 'Traded in USD',
                            data: result.data.slice(0,maxSize).map((row)=>row.trade_usd).filter(Number),
                            borderColor: 'black',
                            backgroundColor: 'green'
                        },
                        {
                            label: 'Weight in kg',
                            data: result.data.slice(0,maxSize).map((row)=>row.weight_kg).filter(Number),
                            borderColor: 'black',
                            backgroundColor: 'red'
                        },
                        {
                            label: 'Quantity in 10s',
                            data: result.data.slice(0,maxSize).map((row)=>row.quantity).filter(Number).map((quantity) => quantity/10),
                            borderColor: 'black',
                            backgroundColor: 'blue'
                        },
                    ]
                });
                setChartOptions({
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        },
                        title: {
                            display: 'true',
                            text: 'Commodity trade statistics data'
                        }
                    }
                });
            })
        });
    },[]);

    return (
        <div>
            {
                chartData.datasets.length<1?
                (
                    <div>
                        Loading...
                    </div>
                ):
                (
                    <div>
                        <Bar width={300} height={100} options={chartOption} data={chartData} />
                    </div>
                )
            }
        </div>
    )
}