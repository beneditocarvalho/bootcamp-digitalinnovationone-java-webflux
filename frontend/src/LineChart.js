import React, { Component } from 'react';
import CanvasJSReact from './assets/canvas.react';
import { getChart } from './services/api';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var openValues = [];
var closeValues = [];

class LineChart extends Component{
    constructor(){
        super();
        this.updateChart = this.updateChart.bind(this);
    }

    componentDidMount(){
        setInterval(this.updateChart, 1000);
    }

    async fetchData() { 
        const result = await getChart();
        const data = result.data;
                
        openValues.push({
             x: new Date(data.timestamp),
             y: data.openValue
        });
        if(openValues.lenght > 10)
                openValues.shift();
                closeValues.push({
                    x: new Date(data.timestamp),
                    y: data.closeValue
                });
                if (closeValues.lenght > 10)
                    closeValues.shift();
    }

   async updateChart(){
        await this.fetchData();
        this.chart.render();
    }

    render() {
        const options = {
            title:{
                text: 'Stock Quotes'
            },
            axisY: {
                includeZero: false,
                valueFormatString: '0.##0',
                title: 'Price in (USD)'
            },
            axisX: {
                valueFormatString: 'HH:mm',
            },
            data:[{
                type: 'line',
                name: 'Open Value',
                showInLegend: true,
                yValueFormatString: '0.##0',
                xValueFormatString: 'HH:mm',
                dataPoints: openValues
            },{
                type: 'line',
                name: 'Close Value',
                showInLegend: true,
                yValueFormatString: '0.##0',
                xValueFormatString: 'HH:mm',
                dataPoints: closeValues
            }]    
        };

        return (
        <div>
            <h1>Acompanhamento de cotação</h1>
            <CanvasJSChart options={options} onRef={ref => this.chart = ref}/> 
        </div>
        );
	}

}

export default LineChart;