import React from 'react'

export default function InputPhone() {
  return (
  <div className='w-full flex flex-col items-center'>
     <label className='text-[#171717] font-["spirits-soft"] text-[20px] font-[400] leading-8 tracking-[0.4px]'>Phone Number</label>
     <div className='flex flex-row w-[400px] justify-center pt-[5px]'>
      <div className='p-[16px] rounded-l-[4px] border-solid border-[1px] border-[#A3A3A3] bg-[#FFF]'>+91</div>
      <input type="number" className='w-[300px] p-[16px] flex-1 rounded-r-[4px] appearance-none border-solid border-[1px] border-[#A3A3A3] focus:ring-0 focus:ring-offset-0 focus:border-[#A3A3A3] bg-[#FFF] placeholder:text-[16px] placeholder:font-[400] leading-[16px] placeholder:text-[#0A0A0A] placeholder:font-["Fira Sans"]' placeholder='Enter your phone number' />
     </div>
     <div>Submit</div>
  </div>
  )
}
