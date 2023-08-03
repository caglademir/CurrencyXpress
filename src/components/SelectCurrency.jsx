import React from "react";

export default function SelectCurrency({ currency, onChange, label }) {
  return (
    <>
      <div className="grid grid-cols-[60px_1fr] items-center gap-4 text-lg font-medium text-white font-sans ">
        <label className="truncate text-sm">{label}</label>
        <select
          className="bg-stone-800 border-solid border-2 border-stone-600 w-full px-3 py-1 rounded-lg"
          name={label}
          onChange={onChange}
        >
          <optgroup label={label}></optgroup>
          {currency?.map((data, i) => (
            <option value={data} key={i}>
              {data}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
