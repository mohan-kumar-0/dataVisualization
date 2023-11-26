import { useEffect,useState } from "react";
import {Scatter} from 'react-chartjs-2';
import data from './../Dataset/abc.csv';
import Papa from 'papaparse';
import {Chart as ChartJs,CategoryScale,LinearScale,LineElement,Filler,PointElement,Title,Tooltip,Legend,LineController} from 'chart.js';

ChartJs.register(CategoryScale,LinearScale,Filler,PointElement,LineElement,Title,Tooltip,Legend,LineController);

export default function ScatterPlot(maxSize) {

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
                            data: result.data.slice(0,maxSize).map((row)=>{
                                return {
                                    x:row.year,
                                    y:row.trade_usd
                                }
                            }),
                            backgroundColor: 'green'
                        },
                        {
                            label: 'Weight in kg',
                            data: result.data.slice(0,maxSize).map((row)=>{
                                return {
                                    x:row.year,
                                    y:row.weight_kg
                                }
                            }),
                            backgroundColor: 'red'
                        },
                        {
                            label: 'Quantity in 10s',
                            data: result.data.slice(0,maxSize).map((row)=>{
                                return {
                                    x:row.year,
                                    y:row.quantity/10
                                }
                            }),
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
                        <Scatter options={chartOption} data={chartData} />
                    </div>
                )
            }
        </div>
    )
}