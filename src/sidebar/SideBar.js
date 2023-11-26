import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { useState } from 'react';

export default function SideBar(selected,setSelected) {
    const [visible,setVisible] = useState();
    return (
        <div className="card flex justify-content-center">
            <Sidebar visible={visible} onHide={() => setVisible(false)}>
            <h2 onClick={()=>setSelected(0)}>BarGraph</h2>
            <h2 onClick={()=>setSelected(1)}>Stacked BarGraph</h2>
            <h2 onClick={()=>setSelected(2)}>Stacked Grouped BarGraph</h2>
            <h2 onClick={()=>setSelected(3)}>Line Graph</h2>
            <h2 onClick={()=>setSelected(4)}>ScatterPlot</h2>
            </Sidebar>
            <Button icon="pi pi-arrow-right" onClick={() => setVisible(true)} />
        </div>
    );
}