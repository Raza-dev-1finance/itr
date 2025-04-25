import React from 'react';
import cn from '../utils/cn';

export default function CustomButtom({
  onClick,
  text,
  color = false,
}: {
  onClick?: () => void;
  text?: string;
  color?: boolean;
}) {
  return (
    <div className="w-full">
      <button
        className={cn(
          'flex justify-center py-[12px] px-[24px] items-center rounded-[2px] border-solid border-[1px] cursor-pointer w-full',
          color ? 'border-[#5B498E] bg-[#5B498E]' : 'border-[#A3A3A3] cursor-no-drop bg-[#A3A3A3]',
        )}
        onClick={onClick}
        disabled={!color}
      >
        <div className='text-[#fff] text-center font-["Fira Sans"] text-[16px] font-medium leading-[25px]'>
          {text}
        </div>
        <div
          className={cn(
            'top-[35px] w-[400px] h-[50px] absolute rounded-[4px] border-solid border-[1px] left-[3px] z-0',
            color ? 'border-[#5B498E]' : 'border-[#A3A3A3]',
          )}
        ></div>
      </button>
    </div>
  );
}
