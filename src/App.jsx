import { useState, useEffect } from "react";
import SelectCurrency from "./components/selectCurrency";
import axios from "axios";

function App() {
  let [currency, setCurrency] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(  () => {
    const url='https://api.exchangerate.host/latest';
     axios.get(url)
    .then((res) => {
      setCurrency(Object.keys(res.data.rates));
    }
    )
  }, []);
  
  const [input, setInput] = useState(null);
  const [selectFrom, setSelectFrom] = useState(null);
  const [selectTo, setSelectTo] = useState(null);
  const [rate, setRate] = useState({});
  const sendRequest = async(e) => {
    setLoading(true);
    await axios.get(
      `https://api.exchangerate.host/latest?BASE=${selectFrom}&symbols=${selectTo}&amount=${input}`
    )
      .then((result) => {
        setRate(result.data.rates)});

      setLoading(false);
    // .catch(err => console.log(err))
    // console.log(rate)
  };
  let fixedRate = rate[selectTo];

  const valueSelectFrom = (e) => {
    setSelectFrom(e.target.value);
  };

  const valueSelectTo = (e) => {
    setSelectTo(e.target.value);
  };

  //console.log(selectTo);
  return (
    <>
      <div className="flex justify-center items-center auto-rows-max  h-screen bg-stone-900 ">
        <h1 className="text-6xl font-bold text-white m-2">
          CURRENCY <br></br>CONVERTER
        </h1>

        <div className="grid grid-flow-row bg-stone-700 p-10 rounded-lg gap-4 ">
          <div className="grid grid-cols-[60px_1fr] gap-x-4 items-center">
            <label
              htmlFor="amount"
              className="flex gap-4 font-medium text-white text-sm"
            >
              Amount:
            </label>
            <input
              id="amount"
              name="myInput"
              className="border-solid border-2 border-stone-600 rounded-lg flex items-end bg-stone-800 px-3 py-1 text-white outline-none"
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div>
            <SelectCurrency
              label="From:"
              currency={currency}
              onChange={valueSelectFrom}
            />
          </div>
          <div>
            <SelectCurrency
              label="To:"
              currency={currency}
              onChange={valueSelectTo}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className="bg-sky-500/100 border-solid border-2 border-sky-600 rounded-lg p-1 text-white  w-full"
              onClick={sendRequest}
            >
              {loading ? <>Loading..</> : <>Convert</>}
            </button>
            
          </div>
          {fixedRate && (
            <div className="bg-stone-800 rounded-lg p-2 text-lg font-medium text-white flex justify-center">
              {fixedRate.toLocaleString("tr-TR", {
                style: "currency",
                currency: selectTo,
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
