'use client';
import Image from 'next/image';
import React, { ReactNode, useEffect, useState } from 'react';
import InputPan from '@/Modules/components/PanInput';
import { useRouter } from 'next/navigation';
import { VerificationResponse } from '@/types';
import { getStorage, removeStorage, updateStorage } from '@/Modules/utils/storage';
import tax_api from '@/Modules/utils/axios';
import analytics from '@/Modules/utils/analytics';

export default function PanVerify() {
  const [value, setvalue] = useState<string | undefined>('');
  const [color, setcolor] = useState<boolean>(false);
  const [errorModal, setErrorModal] = useState<ReactNode>(null);
  const router = useRouter();

  useEffect(() => {
    const data = getStorage<VerificationResponse>("verification")
    if (!data?.token){
      router.replace("/")
    } else {
      if (!data?.pan_submitted) {
        // Not pan -> Show pan page
        router.push('/pan-verify');
      } else if (!data?.personal_details_submitted || !data.payment_successful) {
        // Not Address & Name -> Show address page
        router.push('/details');
      } else if (data.payment_successful) {
       // Payment is done -> Show documnet upload page
       router.push('/document-upload');
      }
    }
  },[router])

  const onPanInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // if (/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/.test(inputValue) && inputValue !== '') {
    if (/[A-Z]{3}[PH][A-Z][0-9]{4}[A-Z]/.test(inputValue) && inputValue !== '') {
        setErrorModal("");
    }
    else{
        setErrorModal("Please enter a valid PAN.");
    }
  };
  const onPanInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 10) {
      // if (!(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/.test(inputValue) && inputValue !== '')) {
      if (!(/[A-Z]{3}[PH][A-Z][0-9]{4}[A-Z]/.test(inputValue) && inputValue !== '')) {
          setcolor(false);
          if (inputValue.length >= 10) {
            setErrorModal("Please enter a valid PAN.");
          }
      }
      else{
          setErrorModal("");
          setcolor(true);
      }
      onChangeValue(inputValue);
    }
    // return;
  };
  const onChangeValue = (value: string) => {
    setvalue(value);
  };
  function extractPanFromMessage(message: string) {
    const regex = /with (\w+)\. Use other/;
    const match = message.match(regex);
    return match ? match[1] : null;
  }
  function handleBack() {
    analytics({"gtm.text": "EditNumberClicked-PanPage"})
    removeStorage("verification");
    router.push("/")
  }
  const handleSubmit = () => {
    if (value?.length === 10 && color) {
      setcolor(false)
      analytics({"gtm.text": "PanDataSubmitted"})
      tax_api.post(`/website/submit_pan?pan=${value}`).then(({data}) => {
        updateStorage("verification", {pan_submitted: true})
        router.push("/details")
        setvalue("")
      }).catch(err => {
        if(err.response.status === 400 && err.response?.data.msg != ""){
          const pan = extractPanFromMessage(err.response?.data.msg)
          console.log({pan})
          setErrorModal(<>
           This PAN is already registered with {pan}. Use other PAN or <span onClick={handleBack} className='underline cursor-pointer'>go back</span> to edit mobile number.
          </>)
          setcolor(false)
        }
        console.error(err.response.data.msg)
      })
    } else {
      console.log('Invalid phone number');
    }
    // setcolor(true)
  };

  const handleChatClick = () => {
    const msg = encodeURIComponent('Hey! I need help in ITR filling!');
    analytics({"gtm.text": "ChatWithUs-PanPage"})
    window.open(`https://api.whatsapp.com/send?phone=917718801029&text=${msg}`,'_blank');
  };

  function handleCall() {
    tax_api.post("/website/request-callback").then((res) => {
      console.log({ res })
    }).catch(err => {
      console.error(err)
    })
  }

  return (
    <>
      <div className="w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between lg:justify-center pt-[60px] min-h-screen py-16 lg:py-0">
          <div className="flex flex-col items-center w-11/12 lg:w-[610px] lg:p-[80px] rounded-[8px] lg:bg-white">
            <Image
              src="https://imaages-hosting-1fin.s3.ap-south-1.amazonaws.com/Website_team/Backend/Logo_1745575770.png"
              width={60}
              height={65}
              alt="logo"
            />
            <div className='pt-[30px] text-[#0A0A0A] text-center text-2xl lg:text-[36px] font-[500] leading-8 lg:leading-[44px] font-["spirits-soft"]'>
              File Your ITR Right With Our CAs:<br></br>Save Tax, Stay Compliant
            </div>
            <div className="w-full flex flex-col items-center px-[16px] py-[25px] lg:p-[50px] rounded-[8px] bg-[#F6F6FC] mt-[30px]">
              <InputPan
                value={value}
                onChange={onPanInputChange}
                onBlur={onPanInputBlur}
                btn_disable={color}
                handleSubmit={handleSubmit}
                errorModal={errorModal}
              />
            </div>
            {/* <div className='hidden lg:flex flex-col items-center lg:bg-white pt-[30px]'>
              <div className='text-[#0A0A0A] text-center font-["Fira Sans"] text-[14px] font-light leading-5'>Need help or have any queries?</div>
              <div className='flex flex-row items-center gap-[8px] pt-[10px] cursor-pointer' onClick={handleCall}>
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
                  <path d="M16.1724 12.9763L13.9082 10.6039C13.0996 9.75659 11.7249 10.0955 11.4015 11.197C11.1589 11.9596 10.3502 12.3832 9.62245 12.2137C8.00518 11.7901 5.82186 9.58713 5.41754 7.80783C5.17495 7.04524 5.66013 6.19796 6.38791 5.94381C7.43913 5.60489 7.76259 4.16451 6.95395 3.31722L4.68977 0.944825C4.04286 0.351725 3.07249 0.351725 2.50645 0.944825L0.970039 2.55467C-0.566371 4.24924 1.13177 8.73985 4.93236 12.7221C8.73295 16.7043 13.0187 18.5684 14.636 16.8738L16.1724 15.2639C16.7385 14.5861 16.7385 13.5694 16.1724 12.9763Z" fill="#5B498E" />
                </svg>
                <div className='text-[#0A0A0A] font-["Fira Sans"] text-[16px] font-medium leading-4'>Request a call back</div>
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.50784 17.3008C7.11579 16.9871 7.05223 16.415 7.36587 16.023L11.76 10.5303L7.36587 5.03763C7.05223 4.64558 7.11579 4.0735 7.50784 3.75985C7.8999 3.44621 8.47198 3.50977 8.78562 3.90183L13.6341 9.9624C13.8997 10.2944 13.8997 10.7662 13.6341 11.0982L8.78562 17.1588C8.47198 17.5508 7.8999 17.6144 7.50784 17.3008Z" fill="#0A0A0A" />
                </svg>
              </div>
            </div> */}
          </div>
          <div className='flex lg:hidden flex-col items-center lg:bg-white pt-[30px]'>
            <div className='text-[#0A0A0A] text-center font-["Fira Sans"] text-[14px] font-light leading-5'>Need help or have any queries?</div>
            <div className='flex flex-row items-center gap-[8px] pt-[10px] cursor-pointer' onClick={handleChatClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M17.0066 2.94C15.1066 1.04 12.5966 0 9.93657 0C4.48657 0 0.0565696 4.46 0.0565696 9.94C0.0565696 11.59 0.456573 13.2 1.21657 14.61L0.0265708 19.06C-0.0434292 19.31 0.0265732 19.59 0.216573 19.78C0.356573 19.92 0.546572 20 0.746572 20C0.806572 20 0.876574 19.99 0.936574 19.98L5.50657 18.78C6.88657 19.5 8.41657 19.88 9.93657 19.88C15.4866 19.88 19.9966 15.42 19.9966 9.94C19.9966 7.36 18.9366 4.87 17.0066 2.94ZM14.1666 13.25L13.3266 14.08C12.4466 14.96 10.1266 14 8.05657 11.93C5.99657 9.86999 5.06658 7.54 5.90657 6.66L6.73658 5.82001C6.83658 5.74001 7.04658 5.6 7.31658 5.59C7.56658 5.59 7.74656 5.70001 7.92656 5.82001C8.64656 6.32001 9.01657 6.57 9.15657 7.05C9.32657 7.63 9.10656 8.16 9.00656 8.36C9.06656 8.66 9.26657 9.45999 9.97657 10.15C10.6866 10.85 11.4866 11.05 11.7866 11.11C11.9766 10.98 12.4266 10.72 12.9366 10.83C13.3666 10.92 13.6266 11.31 14.1666 12.06C14.2766 12.22 14.3866 12.4 14.3966 12.64C14.3966 12.93 14.2466 13.15 14.1666 13.25Z" fill="#4CAF50"/>
              </svg>
              <div className='text-[#0A0A0A] font-["Fira Sans"] text-[16px] font-medium leading-4'>Chat with us</div>
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.50784 17.3008C7.11579 16.9871 7.05223 16.415 7.36587 16.023L11.76 10.5303L7.36587 5.03763C7.05223 4.64558 7.11579 4.0735 7.50784 3.75985C7.8999 3.44621 8.47198 3.50977 8.78562 3.90183L13.6341 9.9624C13.8997 10.2944 13.8997 10.7662 13.6341 11.0982L8.78562 17.1588C8.47198 17.5508 7.8999 17.6144 7.50784 17.3008Z" fill="#0A0A0A" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
