import React from 'react';

import { countries } from './components/constants';
import Select from './components/Select';
import Tabs from './components/Tabs';

function App() {
  const [country, setCountry] = React.useState('USA');
  return (
    <div className="flex gap-6 w-full h-full p-6">
      <Tabs />
      <Select state={country} setState={setCountry} options={countries} />
    </div>
  );
}

export default App;
