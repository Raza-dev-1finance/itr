/* eslint-disable no-unused-vars */
'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import CustomButtom from './CustomButtom';
import cn from '../utils/cn';
import Dropdown from './Dropdown';

type InputPhoneProps = {
  value: { [key: string]: string };
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, isRequired: boolean) => void;
  btn_disable: boolean;
  handleSubmit: () => void;
  onClick?: (name: string) => void;
  cityarr: boolean;
  statearr: boolean;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  setvalue: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  setcityarr: React.Dispatch<React.SetStateAction<boolean>>;
  setstatearr: React.Dispatch<React.SetStateAction<boolean>>;
  formData: {
    label: ReactNode;
    placeholder: string;
    type: string;
    name: string;
    required: boolean;
    options?: boolean;
    areatext?: boolean;
  }[];
  errorModal?: { [key: string]: string };
};

export default function FormInput({
  value,
  onChange,
  onBlur,
  btn_disable,
  handleSubmit,
  errorModal,
  formData,
  onClick,
  cityarr,
  statearr,
  wrapperRef,
  setcityarr,
  setstatearr,
  setvalue,
}: InputPhoneProps) {

  const statesOfIndia = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
    // "Select an option"
  ];

  const [states, setStates] = useState(statesOfIndia);
  const [inputChange, setInputChange] = useState("");

  function handleOptionClick(state: string) {
    setvalue(prev => ({ ...prev, "state": state }))
    setStates([...statesOfIndia])
    setInputChange("")
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    if (val !== "") {
      const filteredStates = statesOfIndia.filter((state) =>
        state.toLowerCase().includes(val.toLowerCase())
      );
      setStates([...filteredStates]);
      setInputChange(val)
    } else {
      setStates([...statesOfIndia])
      setInputChange("")
      setvalue(prev => ({...prev,"state": ""}))
    }
  }

  function handleStateInputBlur() {
    if(value.state == ""){
      setInputChange("")
      setStates([...statesOfIndia])
    }
  }

  // useEffect(() => {
  //   if(value.state != ""){
  //     const filteredStates = statesOfIndia.filter((state) =>
  //       state.toLowerCase().includes(value.state.toLowerCase())
  //     );
  //     setStates([...filteredStates]);
  //     setInputChange(value.state)
  //   }
  // },[value.state])

  return (
    <div className="w-full flex flex-col items-center">
      {formData.map((data, index) => (
        <div key={index} className="flex flex-col pb-[20px] w-full" >
          <label className='text-[#0A0A0A] self-start font-["Fira Sans"] text-[14px] font-[400] leading-8 tracking-[0.4px]'>
            {data.label}{data.required ? (<sup className='text-red-600'>*</sup>) : null}
          </label>
          <div className="w-full flex flex-row justify-center pt-[2px] relative" >
            {data.options ?
              // <div className="w-full flex flex-row justify-center pt-[5px] relative">
              //   <div onClick={() => onClick && onClick(data.name)} ref={wrapperRef} className={cn(` flex flex-row justify-between w-full p-[16px] flex-1 rounded-[4px] cursor-pointer
              //   appearance-none border border-[#A3A3A3] focus:ring-0 focus:ring-offset-0
              //   focus:border-[#A3A3A3] bg-white text-[16px] font-[400] leading-[16px] text-[#000] font-['Fira Sans'] items-center`)}>{value.state == "" ? data.placeholder : value.state}
              //     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              //       <path d="M10 12.2307C9.89957 12.2307 9.80609 12.2147 9.71956 12.1827C9.63302 12.1506 9.55076 12.0956 9.47277 12.0176L5.72758 8.2724C5.61219 8.15703 5.55317 8.012 5.5505 7.83732C5.54782 7.66266 5.60685 7.51496 5.72758 7.39424C5.84831 7.2735 5.99467 7.21313 6.16667 7.21313C6.33867 7.21313 6.48503 7.2735 6.60575 7.39424L10 10.7885L13.3943 7.39424C13.5096 7.27885 13.6547 7.21982 13.8293 7.21716C14.004 7.21447 14.1517 7.2735 14.2724 7.39424C14.3932 7.51496 14.4535 7.66132 14.4535 7.83332C14.4535 8.00532 14.3932 8.15168 14.2724 8.2724L10.5272 12.0176C10.4492 12.0956 10.367 12.1506 10.2804 12.1827C10.1939 12.2147 10.1004 12.2307 10 12.2307Z" fill="#0A0A0A" />
              //     </svg>
              //   </div>
              //   {data.name === "state" && statearr &&
              //     (
              //       <div ref={wrapperRef} style={{ boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.02)' }} className='w-[410px] max-sm:w-[310px] overflow-x-scroll max-h-[250px] absolute top-[55px] border-[1px] border-[#61625E] bg-white rounded-b-[2px] z-30'>
              //         {statesOfIndia.map((state, index) => (
              //           <>
              //             <div key={index} className='flex py-[12px] px-[16px] cursor-pointer text-[#171717] font-["Fira Sans"] text-[14px] font-normal leading-5 over' onClick={() => {
              //               setvalue((prev) => ({ ...prev, state: state }))
              //               setstatearr(false)
              //             }}>{state}</div>
              //           </>
              //         ))}
              //       </div>
              //     )}
              // </div>
              <Dropdown 
                options={states} 
                onInputChange={handleInputChange}
                value={inputChange != "" ? inputChange : value.state} 
                handleOptionClick={handleOptionClick} 
                handleInputBlur={handleStateInputBlur}
                key={index}
              />
              : (data?.areatext ?
                <textarea
                  name={data.name}
                  id={data.name}
                  value={value[data.name]}
                  autoComplete="off"
                  required={data.required}
                  onChange={onChange}
                  onBlur={(event) => onBlur(event, data.required)}
                  placeholder={data.placeholder}
                  className={cn(`w-full p-[16px] flex-1 rounded-[4px]
                appearance-none border border-[#A3A3A3] focus:ring-0 focus:ring-offset-0
                focus:border-[#A3A3A3] bg-white text-[16px] font-[400] leading-[16px] text-[#000] font-['Fira Sans'] h-[110px]`)}
                />
                : <input
                  type={data.type}
                  name={data.name}
                  id={data.name}
                  value={value[data.name]}
                  autoComplete="off"
                  required={data.required}
                  onChange={onChange}
                  onBlur={(e) => onBlur(e, data.required)}
                  placeholder={data.placeholder}
                  className={cn(`w-full p-[16px] flex-1 rounded-[4px]
                appearance-none border border-[#A3A3A3] focus:ring-0 focus:ring-offset-0
                focus:border-[#A3A3A3] bg-white text-[16px] font-[400] leading-[16px] text-[#000] font-['Fira Sans']`)}
                />)
            }
          </div>
          {errorModal && errorModal[data.name] != "" && (
            <div className="w-full flex flex-row justify-start pt-[2px] relative ">
              <div className="text-red-500 text-sm">{errorModal[data.name]}</div>
            </div>
          )}
        </div>
      ))}
      <div className="pt-[20px] w-full lg:w-5/6 relative">
        <CustomButtom onClick={() => handleSubmit()} text="Make payment" color={btn_disable} />
      </div>
    </div>
  );
}
