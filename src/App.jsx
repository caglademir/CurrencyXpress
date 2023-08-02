
import React, { useState, useEffect } from 'react';



function App() {

  let [currency, setCurrency] = useState(null)

  useEffect(() => {
    fetch("https://api.exchangerate.host/latest")
      .then(res => res.json())
      .then(data => setCurrency(Object.keys(data.rates)))
  }, [])

  const [selectFrom, setSelectFrom] = useState(null)
  return (
    <>
      <form >
        <label onChange={event => setSelectFrom(event.target.value)}>
          Amount: <input name="myInput" />
        </label>
        <select name="from" id="">
          <optgroup label="FROM"></optgroup>
          {currency?.map((data, i) => (
            <option value={data} key={i}>{data}</option>
          ))}
        </select>
        <label>To:</label>
        <select name="to" id="">
          <optgroup label="TO"></optgroup>
          {currency?.map((data, i) => (
            <option value={data} key={i}>{data}</option>
          ))}
        </select>
        <button>Convert</button>
      </form>
    </>
  )
}

export default App
