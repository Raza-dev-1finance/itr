
import InputPhone from '@/Modules/components/InputPhone'
import Image from 'next/image'
import React from 'react'

export default function PhonePages() {
  return (
    <div className="w-full bg-[#E2E1F3] h-screen">
        <div className='flex flex-row justify-center pt-[60px]'>
        <div className='flex flex-col items-center w-[610px] p-[80px] rounded-[8px] bg-white'>
           <Image src="https://imaages-hosting-1fin.s3.ap-south-1.amazonaws.com/Website_team/Backend/Logo_1745575770.png" width={60} height={65} alt="logo"/>
           <div className='pt-[30px] text-[#0A0A0A] text-center text-[36px] font-[500] leading-[44px] font-["spirits-soft"]'>
           File Your ITR Right With Our CAs:<br></br>Save Tax, Stay Compliant
           </div>
           <div className='flex flex-col items-center p-[50px] rounded-[8px] bg-[#F6F6FC] mt-[30px]'>
           <InputPhone/>
           </div>
        </div>
        </div>
    </div>
  )
}
