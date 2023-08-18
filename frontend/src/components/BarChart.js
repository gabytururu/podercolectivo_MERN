import{Bar} from 'react-chartjs-2'
import {Chart as ChartJs} from 'chart.js/auto'
const BarChart = ({chartData}) => {


    return ( 
        // <Bar data={chartData} options={{}}/>
        <Bar data={chartData} />
     );
}
 
export default BarChart;