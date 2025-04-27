'use client';
import './OtpInput.css';
import CustomButtom from './CustomButtom';
import { useRef, useState, ChangeEvent, KeyboardEvent } from 'react';

type OtpInputProps = {
  btn_disable: boolean;
  length: number;
  handleSubmit: () => void;
  setOptCombine: React.Dispatch<React.SetStateAction<string>>;
};

export default function OtpInput({
  handleSubmit,
  btn_disable,
  length,
  setOptCombine,
}: OtpInputProps) {
  const [otp, setOtp] = useState<string[]>(() => new Array(length).fill(''));
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (
      (e.key === 'Backspace' || e.key === 'Delete') &&
      !otp[index] &&
      index > 0 &&
      otpInputRefs.current[index - 1]
    ) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const tempOtp = [...otp];

    if (value.length <= 2) {
      tempOtp[index] = value.substring(value.length - 1);
      setOtp(tempOtp);

      const combinedOtp = tempOtp.join('');
      setOptCombine(combinedOtp);

      if (value !== '' && index < otp.length - 1 && otpInputRefs.current[index + 1]) {
        otpInputRefs.current[index + 1]?.focus();
      }
    } else {
      const pastedData = value
        .split('')
        .filter((char) => !isNaN(Number(char)))
        .slice(0, length);
      pastedData.forEach((char, i) => {
        tempOtp[i] = char;
        if (otpInputRefs.current[i]) {
          otpInputRefs.current[i]!.value = char;
        }
      });
      setOtp(tempOtp);

      const combinedOtp = tempOtp.join('');
      setOptCombine(combinedOtp);

      const nextIndex = pastedData.length < length ? pastedData.length : length - 1;
      if (otpInputRefs.current[nextIndex]) {
        otpInputRefs.current[nextIndex]?.focus();
      }
    }
  };

  const handleClick = (index: number) => {
    if (index > 0 && !otp[index - 1]) {
      const firstEmptyIndex = otp.indexOf('');
      if (firstEmptyIndex !== -1 && otpInputRefs.current[firstEmptyIndex]) {
        otpInputRefs.current[firstEmptyIndex]?.focus();
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <label className='text-[#171717] font-["spirits-soft"] text-[20px] font-[400] leading-8 tracking-[0.4px]'>
        OTP Verification
      </label>
      <div className="OtpContainer">
        {otp.map((val, index) => (
          <div className="OtpInput" key={`otp-${index}`}>
            <input
              type="number"
              value={val}
              ref={(input: HTMLInputElement | null) => {
                otpInputRefs.current[index] = input;
              }}
              onChange={(e) => handleChange(index, e)}
              onClick={() => handleClick(index)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              inputMode="numeric"
            />
          </div>
        ))}
      </div>
      <div className="pt-[30px] w-full relative">
        <CustomButtom onClick={handleSubmit} text="Verify" color={btn_disable} />
      </div>
    </div>
  );
}
