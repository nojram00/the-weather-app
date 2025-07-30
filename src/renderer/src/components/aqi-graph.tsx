/* eslint-disable prettier/prettier */
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

import { Line } from 'react-chartjs-2'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend)

export default function AQIGraph({
  time,
  pm_10,
  pm_2_5,
  city
} : {
  time: Array<any>,
  pm_10: Array<any>,
  pm_2_5: Array<any>,
  city: string
}) {

  const data = {
    labels: time.map(d => new Date(d).toLocaleString([], { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' })),
    datasets: [
      {
        label: 'Particulate Matter (PM) 10',
        data: pm_10,
        backgroundColor: '#53A2BE',
        borderColor: '#176087',
        borderWidth: 1,
        tension: 0.4
      },
      {
        label: 'Particulate Matter (PM) 2.5',
        data: pm_2_5,
        backgroundColor: '#176087',
        borderColor: '#53A2BE',
        borderWidth: 1,
        tension: 0.4
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: `Air Quality Index ${city ? '- ' + city : "" }`
      }
    }
  }

  return (
    <Line data={data} options={options}/>
  )
}
