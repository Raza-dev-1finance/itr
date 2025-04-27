import React from 'react';
import './CustomButton.css';

export default function CustomButtom({
  onClick,
  text,
  color = false,
  cls = '',
}: {
  onClick?: () => void;
  text?: React.ReactNode;
  color?: boolean;
  cls?: string;
}) {
  return (
    <div className={`w-full ${cls}`}>
      <button className="CustomButton" onClick={onClick} disabled={!color}>
        <div className='text-[#fff] text-center font-["Fira Sans"] text-[16px] font-medium leading-[25px]'>
          {text}
        </div>
      </button>
    </div>
  );
}
