import data from './../Dataset/commodity_trade_statistics_data.csv';
import Papa from 'papaparse';
import { useEffect,useState } from 'react';


export default function GetData() {

    Papa.parse(data,{
        download:true,
        header:true,
        dynamicTyping:true,
        delimiter:'',
        complete: ((result) => {
            //console.log(result);
            return result.data;
        })
    });

}