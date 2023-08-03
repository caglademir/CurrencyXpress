
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

  const valueSelectTo= (e) => {
    setSelectTo(e.target.value);
  }
  
  return (
    <>
      
        <label>
          Amount: <input name="myInput" onChange={e => setInput(e.target.value)} />
        </label>

        <SelectCurrency label={"From:"} currency={currency} onChange={valueSelectFrom}/>
        <SelectCurrency label={"To:"} currency={currency} onChange={valueSelectTo}/>

        <button type="button" onClick={sendRequest}>Convert</button>
      
     <div>{fixedRate?.toFixed(2)}</div>
    </>
  )
}

export default App
