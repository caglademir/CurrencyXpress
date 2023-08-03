
import React, { useState, useEffect } from 'react';
import SelectCurrency from './components/selectCurrency';

function App() {

  let [currency, setCurrency] = useState(null)

  useEffect(() => {
    fetch("https://api.exchangerate.host/latest")
      .then(res => res.json())
      .then(data => setCurrency(Object.keys(data.rates)))
  }, [])

  const [input, setInput] = useState(null)
  const [selectFrom, setSelectFrom] = useState(null)
  const [selectTo, setSelectTo] = useState(null)
  const [rate, setRate] = useState({})

  const sendRequest = (e) => {

    fetch(`https://api.exchangerate.host/latest?BASE=${selectFrom}&symbols=${selectTo}&amount=${input}`)
      .then(res => res.json())
      .then(data => setRate(data.rates))
    // .catch(err => console.log(err))
    // console.log(rate)
  }
  let fixedRate = rate[selectTo];

  const valueSelectFrom = (e) => {
    setSelectFrom(e.target.value);
  }

  const valueSelectTo = (e) => {
    setSelectTo(e.target.value);
  }

  return (
    <>
      <div className='flex justify-center items-center auto-rows-max  h-screen bg-stone-900 '>

        <h1 className='text-6xl font-bold text-white m-2'>CURRENCY <br></br>CONVERTER</h1>

        <div className='grid grid-flow-row bg-stone-700 p-10 rounded-lg flex gap-4 '>
          <div>
            <label className='flex gap-4 text-lg font-medium text-white'>Amount:
              <input name="myInput" className='border-solid border-2 border-stone-600 rounded-lg flex items-end bg-stone-800'
                onChange={e => setInput(e.target.value)} />
            </label>
          </div>
          <div>
            <SelectCurrency label={"From:"} currency={currency} onChange={valueSelectFrom} />
          </div>
          <div>
            <SelectCurrency label={"To:"} currency={currency} onChange={valueSelectTo} />
          </div>
          <div className='flex justify-center'>
            <button type="button" className='bg-sky-500/100 border-solid border-2 border-sky-600 rounded-lg p-1 text-white  w-full'
              onClick={sendRequest}>Convert</button>
          </div>
          <div className='bg-stone-800 rounded-lg p-2 text-lg font-medium text-white flex justify-center'>
            {fixedRate?.toFixed(2)}
          </div>
        </div>

      </div>
    </>
  )
}

export default App
