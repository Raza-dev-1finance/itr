'use client';
import React, { ReactNode } from 'react';
import CustomButtom from './CustomButtom';
import Image from 'next/image';

type InputPhoneProps = {
  value: string | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  btn_disable: boolean;
  handleSubmit: () => void;
  errorModal: ReactNode;
};

export default function InputPan({
  value,
  onChange,
  onBlur,
  btn_disable,
  handleSubmit,
  errorModal
}: InputPhoneProps) {
  const hasValue = value && value?.length > 0;
  return (
    <div className="w-full flex flex-col items-center">
      <label className='text-[#171717] font-["spirits-soft"] text-[20px] font-[400] leading-8 tracking-[0.4px]'>
      Permanent Account Number (PAN)
      </label>
    <div className="w-full flex flex-row justify-center pt-[5px] relative">
    <input
    type="text"
    name="pan"
    id="pan"
    value={value}
    autoComplete="off"
    required
    onChange={(e) => {
      const capitalizedValue = e.target.value.toUpperCase();
      onChange({ ...e, target: { ...e.target, value: capitalizedValue } });
    }}
    onBlur={onBlur}
    placeholder="Enter your PAN"  // <-- Add your label text here
    className="peer w-full pt-[20px] pr-[16px] pb-[8px] pl-[10px] flex-1 rounded-[4px]
    appearance-none border border-[#A3A3A3] focus:ring-0 focus:ring-offset-0
    focus:border-[#A3A3A3] bg-transparent placeholder-transparent text-[16px] font-[400] leading-[16px] text-[#000] font-['Fira Sans'] z-10"
  />
     <span
        className={`absolute left-[10px] transition-all text-[#A3A3A3] font-['Fira Sans'] z-0
          ${hasValue ? "top-[8px] text-[12px]" : "top-[18px] text-[16px]"}
          peer-focus:top-[8px] peer-focus:text-[12px]`}
      >
    Enter your registered PAN 
    </span>
    </div>
    {errorModal && (
        <div className='w-full flex flex-row justify-start pt-[2px] relative '>
        <div className="text-red-500 text-sm">
            {errorModal}
        </div>
        </div>
    )}
      <div className="pt-[20px] w-full relative">
        <CustomButtom onClick={() => handleSubmit()} text="Continue" color={btn_disable} />
      </div>
    </div>
  );
}
