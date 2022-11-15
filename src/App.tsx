import React from 'react';
import Chart from 'react-google-charts'

import { countries, types, months } from './utils/constants';
import Select from './components/Select';
import Reader from './components/Reader';

function App() {
  const [country, setCountry] = React.useState('INR');
  const [options, setOptions] = React.useState("Monthly")
  const [data, setData] = React.useState({
    data: [],
    info: ""
  })
  const [chart, setChart] = React.useState([]) 
  React.useEffect(() => {
    if(data.data.length) {
      switch(options) {
      case "Daily" :setChart(() => {
        const tmp: any[] = []
        data?.data.forEach((obj, idx) => {
        tmp.push([obj.ate, obj[country]])
      })
      return tmp;
    })
    break;
    case "Weekly": 
    break;
  }
    }

  }, [country, data])

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
      <Select state={options} setState={setOptions} options={types} />
      <Reader data={data} setData={setData} />
    {/* {chart.join(" ")} */}
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
