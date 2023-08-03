import React from 'react'

export default function SelectCurrency({currency, onChange, label}) {
  return (
    <>
    <select name={label} onChange={onChange}>
          <optgroup label={label}></optgroup>
          {currency?.map((data, i) => (
            <option value={data} key={i}>{data}</option>
          ))}
        </select>
    </>
  )
}
