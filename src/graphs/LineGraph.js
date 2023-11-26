import { useEffect,useState } from "react";
import {Line} from 'react-chartjs-2';
import data from './../Dataset/abc.csv';
import Papa from 'papaparse';
import {Chart as ChartJs,CategoryScale,LinearScale,LineElement,Filler,PointElement,Title,Tooltip,Legend,LineController} from 'chart.js';

ChartJs.register(CategoryScale,LinearScale,Filler,PointElement,LineElement,Title,Tooltip,Legend,LineController);

export default function LineGraph(maxSize) {

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
                            borderColor: 'green',
                            backgroundColor: 'green',
                            pointBorderColor: 'black',
                            fill: false,
                            borderDash: [5,5],
                            tension:0.4
                        },
                        {
                            label: 'Weight in kg',
                            data: result.data.slice(0,maxSize).map((row)=>row.weight_kg).filter(Number),
                            borderColor: 'red',
                            backgroundColor: 'red',
                            pointBorderColor: 'black',
                            fill: false,
                            tension:0.4
                        },
                        {
                            label: 'Quantity in 10s',
                            data: result.data.slice(0,maxSize).map((row)=>row.quantity).filter(Number).map((quantity) => quantity/10),
                            borderColor: 'blue',
                            backgroundColor: 'blue',
                            pointBorderColor: 'black',
                            fill: 'origin',
                            tension:0.4
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
                        <Line options={chartOption} data={chartData} />
                    </div>
                )
            }
        </div>
    )
}