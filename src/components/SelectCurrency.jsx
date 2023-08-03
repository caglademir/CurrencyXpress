import React from 'react'

export default function SelectCurrency({currency, onChange, label}) {
  return (
    <>
<div className='flex gap-4 text-lg font-medium text-white font-sans '>
    <label >{label}</label>
    <select className='w-3/5 bg-stone-700 ' name={label} onChange={onChange}>
          <optgroup label={label}></optgroup>
          {currency?.map((data, i) => (
            <option value={data} key={i}>{data}</option>
          ))}
        </select>
</div>
    </>
  )
}
