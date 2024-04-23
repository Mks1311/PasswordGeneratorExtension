import { useEffect, useState, useCallback, useRef } from 'react'
import './App.css'
import Checkbox from './Checkbox.jsx'

function App() {
  let [length, SetLength] = useState(4);
  let [smallChar, SetSmallChar] = useState(false);
  let [capsChar, SetCapsChar] = useState(true);
  let [nums, SetNums] = useState(false);
  let [spclChar, SetSpclChar] = useState(false);
  let [password, SetPassword] = useState("")
  let [cnt, SetCnt] = useState(1);
  let [indicator, SetIndicator] = useState("grey")
  const PasswordRef = useRef(null);

  const PasswordGenerator = useCallback(() => {
    let pass = ""
    let str = ""
    if (capsChar) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (smallChar) str += "abcdefghijklmnopqrstuvwxyz"
    if (nums) str += "0123456789"
    if (spclChar) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    SetPassword(pass)
    cntUpdate();
    IndicatorUpdate();
  }, [length, smallChar, capsChar, nums, spclChar, SetPassword])

  useEffect(() => {
    PasswordGenerator();
  }, [length, smallChar, capsChar, nums, spclChar, SetPassword])

  function cntUpdate() {
    if (capsChar == false) SetCnt((prev) => (prev--));
    if (smallChar == true) SetCnt((prev) => (prev++));
    if (nums == true) SetCnt((prev) => (prev++));
    if (spclChar == true) SetCnt((prev) => (prev++));
  }

  const CopyToClickBoard = useCallback(() => {
    PasswordRef.current?.select();
    PasswordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password);
  }, [password])

  function IndicatorUpdate() {
    if (length > 4 && cnt >= 3) SetIndicator("green");
    else if (length >= 14 && cnt < 2) SetIndicator("yellow");
    else if (length <= 4 || cnt < 2) SetIndicator("grey");
    else if ((length >= 4 && cnt <= 2) || (cnt == 3)) SetIndicator("yellow");
    else SetIndicator("green");
  }

  return (
    <>
      <div className="flex flex-col  justify-center p-2 font-Dosis m-2">
        <div className='px-2 flex flex-wrap items-center w-full  justify-between gap-3'>
          <div className='flex flex-wrap rounded-3xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-2
          items-center justify-evenly'
          >
            <div className='text-base w-9/12'>
              <input
                type="text"
                className="outline-none cursor-default py-1 bg-transparent"
                value={password}
                readOnly
                ref={PasswordRef}
              />
            </div>
          </div>
          <div className='flex flex-wrap items-center justify-center'>
            <span className="h-2 w-2 ml- rounded-xl cursor-default mr-2 shadow-2xl"
              style={{ backgroundColor: indicator, boxShadow: `0px 0px 7px 8px ${indicator}` }}
            ></span>
            <span className="cursor-pointer" onClick={PasswordGenerator}><img className=" ml-3 mr-2 h-4 w-4" src="refresh.png" alt="refresh"></img> </span>
          </div>
          <button className='bg-myBlue scale-100 duration-300 text-white px-2 text-sm py-1 rounded-3xl hover:scale-110'
            style={{ boxShadow: "0 10px 15px -3px rgba(200, 200, 200, 0.1), 0 4px 6px -2px rgba(200, 200, 200, 0.05)" }}
            onClick={CopyToClickBoard}
            select-none
          >
            Copy
          </button>
        </div>

        <div className="p-2 flex  text-base flex-wrap items-center w-full justify-between">
          <div className='mr-7 mb-3'>
            Password Length:<span className='text-lg ml-3'>{length}</span>
          </div>
          <div className='flex flex-row '>
            <div className='flex mx-2 h-9 w-9 pb-2 items-center justify-center bg-white border border-black 
            scale-100  duration-300 text-black text-3xl  rounded-3xl hover:scale-110 
             cursor-pointer select-none'
              onClick={() => {
                if (length > 2) {
                  length--;
                  SetLength(length)
                }
              }}
            >-</div>
            <input id="rangeSlider" type="range" min={2} max={32} value={length} className="w-[180px] py-2 
            accent-[#0070f6] mt-1"
              onChange={(e) => { SetLength(e.target.value) }}
            ></input>
            <div className='mx-2 bg-white border border-black scale-100 duration-300 text-black 
            h-9 w-9 pb-9 text-center  text-3xl cursor-pointer rounded-3xl hover:scale-110 select-none'
              onClick={() => {
                if (length < 32) {
                  length++;
                  SetLength(length)
                }
              }}
            >+</div>
          </div>
        </div>

        <div className="px-2 m-2 flex text-base flex-wrap items-center w-full justify-between">
          <div>Charactes Used:</div>
          <div className='flex flex-wrap gap-2'>
            <Checkbox id="UpperCase" char="ABC" SetFn={SetCapsChar} cnt={cnt} SetCnt={SetCnt} curr={capsChar} />
            <Checkbox id="LowerCase" char="abc" SetFn={SetSmallChar} cnt={cnt} SetCnt={SetCnt} curr={smallChar} />
            <Checkbox id="Nums" char="123" SetFn={SetNums} cnt={cnt} SetCnt={SetCnt} curr={nums} />
            <Checkbox id="Special" char="#$&" SetFn={SetSpclChar} cnt={cnt} SetCnt={SetCnt} curr={spclChar} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
