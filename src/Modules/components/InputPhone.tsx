'use client';
import React from 'react';
import CustomButtom from './CustomButtom';
import Image from 'next/image';

type InputPhoneProps = {
  value: string | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  btn_disable: boolean;
  handleSubmit: () => void;
};

export default function InputPhone({
  value,
  onChange,
  onBlur,
  btn_disable,
  handleSubmit,
}: InputPhoneProps) {
  return (
    <div className="w-full flex flex-col items-center">
      <label className='text-[#171717] font-["spirits-soft"] text-[20px] font-[400] leading-8 tracking-[0.4px]'>
        Phone Number
      </label>
      <div className="w-full flex flex-row justify-center pt-[5px] relative ">
        <div className="pl-[16px] border-r-0 rounded-l-[4px] border-solid border-[1px] border-[#A3A3A3] bg-[#FFF] flex items-center gap-[10px] text-[#0A0A0A]">
          <Image
            src="https://imaages-hosting-1fin.s3.ap-south-1.amazonaws.com/Website_team/Backend/Flag_1745593945.svg"
            width={20}
            height={20}
            alt="flag"
          />
          +91
          <div className="w-[1.5px] h-[20px] bg-[#0A0A0A]"></div>
        </div>
        <input
          type="number"
          name="phone"
          id="phone"
          value={value}
          autoComplete="off"
          required
          onChange={onChange}
          onBlur={onBlur}
          className='w-[300px] pt-[16px] pr-[16px] pb-[16px] pl-[10px] flex-1 rounded-r-[4px]
            appearance-none border-solid border-[1px] border-[#A3A3A3] focus:ring-0 
            focus:ring-offset-0 focus:border-[#A3A3A3] bg-[#FFF] placeholder:text-[16px] 
            placeholder:font-[400] leading-[16px] placeholder:text-[#A3A3A3] 
            placeholder:font-["Fira Sans"] border-l-0'
          placeholder="Enter your phone number"
        />
      </div>
      <div className="pt-[30px] w-full relative">
        <CustomButtom onClick={() => handleSubmit()} text="Submit" color={btn_disable} />
      </div>
    </div>
  );
}
