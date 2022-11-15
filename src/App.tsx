import React from 'react';
import Chart from 'react-google-charts'

import { countries, types, months } from './utils/constants';
import Select from './components/Select';
import Reader from './components/Reader';

const getExt = (chart: any[]) => {
  const min = chart.reduce((prev, curr) => Math.min(prev, curr[1] ?? 1000), 1000);
      const max = chart.reduce((prev, curr) => Math.max(prev, curr[1] ?? 0), 0);
      return {
        min: min,
        max: max
      }
}

function App() {
  const [country, setCountry] = React.useState<string>('USD');
  const [options, setOptions] = React.useState("Monthly")
  const [ext, setExt] = React.useState({
    max: 0,
    min: 0
  })
  const [data, setData] = React.useState<{
    data: any[],
    info: string
  }>({
    data: [],
    info: ""
  })
  const [chart, setChart] = React.useState<any[]>([])
  const [month, setMonth] = React.useState("Jan")
  
  React.useEffect(() => {
    if(data.data.length) {
      let tmp: any[] = []
      switch(options) {
      case "Yearly":
        data?.data.forEach((obj, idx) => {
        tmp.push([obj?.ate, obj[country]])
      })
    break;
    case "Monthly":
      data?.data.forEach((obj, idx) => {
        if(obj?.ate.split("-").at(1) == month) {
          tmp.push([obj?.ate, obj[country]])
        }
    })
    break;
    case "Weekly":
      data?.data.forEach((obj, idx) => {
        const day = Number(obj?.ate.split("-").at(0)) % 7;
        if(!day && obj?.ate.split("-").at(1) == month) {
          tmp.push([obj?.ate, obj[country]])
        }
    })
    break;
    case "Quaterly":
      data?.data.forEach((obj, idx) => {
        if(!(idx%62)) {
          tmp.push([obj?.ate.split("-").at(1), obj[country]])
        }
    })
    break;
      }
      setChart(tmp)
      setExt(getExt(tmp))
    }


  }, [country, data, options, month])

  const LineChartOptions = {
    hAxis: {
      title: 'Month',
    },
    vAxis: {
      title: 'Rate',
    },
    series: {
      1: { curveType: 'function' },
    },
  }


  return (
    <>
    <div className="flex gap-6 w-full h-full p-6">
      <Select state={country} setState={setCountry} options={countries} />
      <Select state={month} setState={setMonth} options={months} />
      <Select state={options} setState={setOptions} options={types} />
      <Reader data={data} setData={setData} />
    </div>
    <div className='flex justify-between border-2 border-gray-500 w-1/4 mx-5 p-3'>
      <span>Max: {ext.max}</span>
      <span>Min: {ext.min}</span>
    </div>
    <Chart
          height={'500px'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["Date", "Rate"],
            ...chart]
          }
          options={LineChartOptions}
          rootProps={{ 'data-testid': '2' }}
          className="p-10"
        />
    </>
  );
}

export default App;
