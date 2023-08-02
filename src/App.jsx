
import React, { useState, useEffect } from 'react';



function App() {

  let [currency, setCurrency] = useState(null)

  useEffect(() => {
    fetch("https://api.exchangerate.host/latest")
      .then(res => res.json())
      .then(data => setCurrency(Object.keys(data.rates)))
  }, [])



  return (
    <>
     
    </>
  )
}

export default App
