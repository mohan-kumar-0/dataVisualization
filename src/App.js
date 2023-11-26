import logo from './logo.svg';
import './App.css';
import BarGraph from './graphs/BarGraph';
import StackedBarGraph from './graphs/StackedBarGraph';
import StackedGroupedGraph from './graphs/StackedGroupedGraph';
import LineGraph from './graphs/LineGraph';
import ScatterPlot from './graphs/ScatterPlot';
import SideBar from './sidebar/SideBar';
import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useState } from 'react';

function App() {
  const maxSize = 50;
  const [selected,setSelected] = useState(0);
  return (
    <div className="App">
      HomePage
      {
        SideBar(selected,setSelected)
      }
      {
        selected===0?BarGraph(maxSize):<div></div>
      }
      {
        selected===1 && StackedBarGraph(maxSize)
      }
      {
        selected===2 && StackedGroupedGraph(maxSize)
      }
      {
        selected===3 && LineGraph(maxSize)
      }
      {
        selected===4 && ScatterPlot(maxSize)
      }
    </div>
  );
}

export default App;
