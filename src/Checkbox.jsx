import React from "react"
function Checkbox({ id, char, SetFn,cnt,SetCnt,curr}) {
    const checked=(id==="UpperCase");
    const valid=(cnt<2 && curr==true);
    return (
        <>
            <div className="inline-flex items-center">
                <label className="relative flex items-center p-2 mr-1 rounded-full cursor-pointer" htmlFor={id}
                    onClick={() => {
                        if(curr===true) SetCnt((prev)=>(--prev))
                        else SetCnt((prev)=>(++prev))
                        SetFn((prev)=>(!prev))
                    }}
                >
                    <input type="checkbox"
                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border 
                    border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-8 
                    before:w-8 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-white 
                    before:opacity-0 before:transition-opacity checked:border-white-900 checked:bg-myBlue checked:before:bg-white
                    hover:before:opacity-30"
                        id="check" defaultChecked={checked} disabled={valid}/>
                    <span
                        className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"
                            stroke="currentColor" strokeWidth="1">
                            <path fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"></path>
                        </svg>
                    </span>
                </label>
                <label className=" text-base font-normal mt-px select-none">
                    {char}
                </label>
            </div>
        </>
    )
}
export default Checkbox