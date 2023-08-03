
import React, { useState, useEffect } from 'react';




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
  
  return (
    <>
      <form>
        <label>
          Amount: <input name="myInput" onChange={e => setInput(e.target.value)} />
        </label>
        <select name="from" id="" onChange={e => setSelectFrom(e.target.value)}>
          <optgroup label="FROM"></optgroup>
          {currency?.map((data, i) => (
            <option value={data} key={i}>{data}</option>
          ))}
        </select>
        <label>To:</label>
        <select name="to" id="" onChange={e => setSelectTo(e.target.value)}>
          <optgroup label="TO"></optgroup>
          {currency?.map((data, i) => (
            <option value={data} key={i}>{data}</option>
          ))}
        </select>
        <button type="button" onClick={sendRequest}>Convert</button>
      </form>
     <div>{fixedRate?.toFixed(2)}</div>
    </>
  )
}

export default App
