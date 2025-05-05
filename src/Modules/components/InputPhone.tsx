'use client';
import React, { useState } from 'react';
import CustomButtom from './CustomButtom';
import Image from 'next/image';
import Link from 'next/link';

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
  const [copied, setCopied] = useState(false);
  const copyToClipboard = async (text: string) => {
    if (typeof window !== "undefined" && "clipboard" in navigator) {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true)
        setTimeout(() => { setCopied(false) }, 1000)
        console.log("✅ Copied:", text);
      } catch (error) {
        console.error("❌ Copy failed:", error);
      }
    } else {
      console.warn("⚠️ Clipboard API not available in this context.");
    }
  };
  const copySvg = (
    <svg onClick={() => copyToClipboard("care@1finance.co.in")} className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M3.3335 15.9529C3.3335 16.3576 3.49423 16.7456 3.78035 17.0317C4.06646 17.3178 4.45451 17.4786 4.85914 17.4786H11.9788C12.3834 17.4786 12.7715 17.3178 13.0576 17.0317C13.3437 16.7456 13.5044 16.3576 13.5044 15.9529V15.4444H15.0301C15.4347 15.4444 15.8228 15.2837 16.1089 14.9975C16.395 14.7114 16.5557 14.3234 16.5557 13.9188V3.74781C16.5557 3.34318 16.395 2.95513 16.1089 2.66902C15.8228 2.3829 15.4347 2.22217 15.0301 2.22217H7.91042C7.50579 2.22217 7.11774 2.3829 6.83163 2.66902C6.54551 2.95513 6.38478 3.34318 6.38478 3.74781V4.25636H4.85914C4.45451 4.25636 4.06646 4.41709 3.78035 4.70321C3.49423 4.98932 3.3335 5.37737 3.3335 5.782V15.9529ZM7.40187 3.74781C7.40187 3.61293 7.45545 3.48358 7.55082 3.38821C7.64619 3.29284 7.77554 3.23926 7.91042 3.23926H15.0301C15.165 3.23926 15.2943 3.29284 15.3897 3.38821C15.485 3.48358 15.5386 3.61293 15.5386 3.74781V13.9188C15.5386 14.0536 15.485 14.183 15.3897 14.2783C15.2943 14.3737 15.165 14.4273 15.0301 14.4273H13.5044V5.782C13.5044 5.37737 13.3437 4.98932 13.0576 4.70321C12.7715 4.41709 12.3834 4.25636 11.9788 4.25636H7.40187V3.74781ZM4.35059 5.782C4.35059 5.64712 4.40417 5.51777 4.49954 5.4224C4.59491 5.32703 4.72426 5.27345 4.85914 5.27345H11.9788C12.1137 5.27345 12.243 5.32703 12.3384 5.4224C12.4338 5.51777 12.4873 5.64712 12.4873 5.782V15.9529C12.4873 16.0878 12.4338 16.2172 12.3384 16.3125C12.243 16.4079 12.1137 16.4615 11.9788 16.4615H4.85914C4.72426 16.4615 4.59491 16.4079 4.49954 16.3125C4.40417 16.2172 4.35059 16.0878 4.35059 15.9529V5.782Z"
        fill="#1A1A1A"
      />
    </svg>
  );
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
          type="text"
          name="phone"
          id="phone"
          value={value}
          autoComplete="off"
          required
          onChange={onChange}
          onBlur={onBlur}
          maxLength={10}
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
          <p className='font-["Fira Sans"] text-center text-[14px] font-light leading-[20px] text-[#0A0A0A] mt-[16px]'>By proceeding, I confirm that I have read, understood, and accepted the <Link href={"https://imaages-hosting-1fin.s3.ap-south-1.amazonaws.com/Website_team/Backend/TermsandConditionsforFilingofIncomeTaxReturns_1746429001.pdf"} target='_blank' className='underline text-[#356494]'>Terms and Conditions</Link> governing the filing of my Income Tax Return.</p>
      </div>
      <div className='mt-5 flex flex-col gap-2 items-center w-full'>
        <Link className='font-["Fira Sans"] text-[14px] underline text-[#356494]' href={"https://imaages-hosting-1fin.s3.ap-south-1.amazonaws.com/Website_team/Backend/PrivacyPolicy_1746429001.pdf"} target='_blank'>Privacy Policy</Link>
        <p className='w-fit font-["Fira Sans"] text-[14px] flex gap-1 relative'>
          For support, mail us at <span className='text-[#356494]'>care@1finance.co.in</span>
          {copySvg}
          {
            copied ? (
              <span className='absolute top-[-35px] bg-[white] p-[5px] rounded-sm right-[-20px] border-[1px]'>Copied</span>
            ) : null
          }
        </p>
      </div>
    </div>
  );
}
