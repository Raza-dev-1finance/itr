'use client';
import CustomButtom from '@/Modules/components/CustomButtom';
import './PhonePage.css';
import InputPhone from '@/Modules/components/InputPhone';
import Modal from '@/Modules/components/Modal';
import OtpInput from '@/Modules/components/OtpInput';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getStorage, setStorage } from '@/Modules/utils/storage';
import { VerificationResponse } from '@/types';
import { useRouter } from 'next/navigation';
import tax_api from '@/Modules/utils/axios';

export default function PhonePages() {
  const router = useRouter();
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [value, setvalue] = useState<string | undefined>('');
  const [color, setcolor] = useState<boolean>(false);

  const OTP_LENGTH = 4;
  const [otpValue, setOtpValue] = useState<string>('');
  const [otpState, setOtpState] = useState<boolean>(false);

  function handleRoute(data: VerificationResponse) {
    if (!data.pan_submitted) {
      // Not pan -> Show pan page
      router.push('/pan-verify');
    } else if (!data.personal_details_submitted || !data.payment_successful) {
      // Not Address & Name -> Show address page
      router.push('/details');
    } else if (data.payment_successful) {
      // Payment is done -> Show documnet upload page
      router.push('/document-upload');
    }
  }

  useEffect(() => {
    const sessionDetails = getStorage<VerificationResponse>('verification');
    if (sessionDetails && sessionDetails?.token) {
      if (!sessionDetails.pan_submitted) {
        // Not pan -> Show pan page
        router.push('/pan-verify');
      } else if (!sessionDetails.personal_details_submitted || !sessionDetails.payment_successful) {
        // Not Address & Name -> Show address page
        router.push('/details');
      } else if (sessionDetails.payment_successful) {
        // Payment is done -> Show documnet upload page
        router.push('/document-upload');
      }
    }
  }, [router]);

  const onPhoneInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length < 10) {
      console.log('Invalid phone number');
      setcolor(false)
    } else {
      console.log('Valid phone number');
    }
  };
  const onPhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim();
    if ((/[eE\-\+\.]/.test(inputValue) || !/^[6-9]\d{0,9}$/.test(inputValue)) && inputValue !== '') {
      return;
    }
    if (inputValue.length <= 10) {
      setvalue(inputValue);
    }
    if(inputValue.length == 10) {
      setcolor(true);
    } else {
      setcolor(false);
    }
  };

  function sendOtp(mobileNumber: string) {
    axios
      .get(`${process.env.NEXT_PUBLIC_TAX_API}/website/get_otp?mobile_no=${mobileNumber}`)
      .then((res) => {
        console.log({ res });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function verifyOtp() {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_TAX_API}/website/verify_otp?mobile_no=${value}&otp=${otpValue}`,
      )
      .then(({ data }) => {
        const verificationResponse: VerificationResponse = {
          token: data.access_token,
          pan_submitted: data.pan_submitted,
          personal_details_submitted: data.personal_details_submitted,
          payment_successful: data.payment_successful,
          docs_uploaded: data.docs_uploaded,
        };
        setStorage<VerificationResponse>('verification', verificationResponse);
        handleRoute(verificationResponse);
      })
      .catch((err) => {
        setErrorModal(true);
        console.error(err);
      });
  }

  const resendOtp = () => {
    if (value?.length === 10) {
      setOtpValue("");
      sendOtp(value);
    }
  };

  const handleSubmit = () => {
    if (value?.length === 10) {
      sendOtp(value);
      setOtpState(true);
    }
  };

  const handleChatClick = () => {
    const msg = encodeURIComponent('Hey! I need help in ITR filling!');
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
      <div className="w-full pt-10 pb-12 flex flex-col justify-between min-h-screen">
        <div className="flex flex-row justify-center pt-[40px]">
          <div className="flex flex-col items-center w-11/12 lg:w-[610px] lg:p-[80px] rounded-[8px] lg:bg-white">
          {
            otpState ? (
                <div className='w-full flex items-center gap-[12px] lg:hidden'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="9" height="18" viewBox="0 0 9 18" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.95382 0.875444C8.42428 1.25182 8.50056 1.93831 8.12419 2.40878L2.85122 8.99999L8.12419 15.5912C8.50056 16.0617 8.42428 16.7482 7.95382 17.1245C7.48335 17.5009 6.79686 17.4246 6.42048 16.9542L0.602332 9.68147C0.283598 9.28305 0.283598 8.71692 0.602332 8.3185L6.42048 1.04581C6.79686 0.575349 7.48335 0.499072 7.95382 0.875444Z" fill="#0A0A0A" />
                  </svg>
                  <p className='text-[18px] font-["Fira Sans"] font-normal leading-7' onClick={() => setOtpState(false)}>Back</p>
                </div>
            ) : null
          }
            <Image
              src="https://imaages-hosting-1fin.s3.ap-south-1.amazonaws.com/Website_team/Backend/Logo_1745575770.png"
              width={60}
              height={65}
              alt="logo"
            />
            <div className='pt-[30px] text-[#0A0A0A] text-center text-2xl lg:text-[36px] font-[500] leading-8 lg:leading-[44px] font-["spirits-soft"]'>
              File Your ITR Right With Our CAs:<br></br>Save Tax, Stay Compliant
            </div>
            <div className="w-full flex flex-col items-center px-[15px] py-[25px] lg:p-[50px] rounded-[8px] bg-[#F6F6FC] mt-[50px] lg:mt-[30px]">
              {otpState ? (
                <OtpInput
                  btn_disable={otpValue.length == OTP_LENGTH}
                  handleSubmit={verifyOtp}
                  length={OTP_LENGTH}
                  setOptCombine={setOtpValue}
                  resendOtp={resendOtp}
                  key={`${errorModal}`}
                />
              ) : (
                <InputPhone
                  value={value}
                  onChange={onPhoneInputChange}
                  onBlur={onPhoneInputBlur}
                  btn_disable={color}
                  handleSubmit={handleSubmit}
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[10px] lg:hidden ChatWithUs">
          <p>Need help or have any queries?</p>
          <div onClick={handleChatClick} className="ChatWithUsContent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M17.0066 2.94C15.1066 1.04 12.5966 0 9.93657 0C4.48657 0 0.0565696 4.46 0.0565696 9.94C0.0565696 11.59 0.456573 13.2 1.21657 14.61L0.0265708 19.06C-0.0434292 19.31 0.0265732 19.59 0.216573 19.78C0.356573 19.92 0.546572 20 0.746572 20C0.806572 20 0.876574 19.99 0.936574 19.98L5.50657 18.78C6.88657 19.5 8.41657 19.88 9.93657 19.88C15.4866 19.88 19.9966 15.42 19.9966 9.94C19.9966 7.36 18.9366 4.87 17.0066 2.94ZM14.1666 13.25L13.3266 14.08C12.4466 14.96 10.1266 14 8.05657 11.93C5.99657 9.86999 5.06658 7.54 5.90657 6.66L6.73658 5.82001C6.83658 5.74001 7.04658 5.6 7.31658 5.59C7.56658 5.59 7.74656 5.70001 7.92656 5.82001C8.64656 6.32001 9.01657 6.57 9.15657 7.05C9.32657 7.63 9.10656 8.16 9.00656 8.36C9.06656 8.66 9.26657 9.45999 9.97657 10.15C10.6866 10.85 11.4866 11.05 11.7866 11.11C11.9766 10.98 12.4266 10.72 12.9366 10.83C13.3666 10.92 13.6266 11.31 14.1666 12.06C14.2766 12.22 14.3866 12.4 14.3966 12.64C14.3966 12.93 14.2466 13.15 14.1666 13.25Z"
                fill="#4CAF50"
              />
            </svg>
            <p>Chat with us</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.00821 17.3008C6.61616 16.9871 6.55259 16.415 6.86623 16.023L11.2604 10.5303L6.86624 5.03763C6.55259 4.64558 6.61616 4.0735 7.00821 3.75985C7.40027 3.44621 7.97235 3.50977 8.28599 3.90183L13.1344 9.9624C13.4001 10.2944 13.4001 10.7662 13.1344 11.0982L8.28599 17.1588C7.97235 17.5508 7.40026 17.6144 7.00821 17.3008Z"
                fill="#0A0A0A"
              />
            </svg>
          </div>
        </div>
      </div>
      <Modal open={errorModal} setOpen={setErrorModal} modalCentreCls="rounded-[2px]">
        <div className="VerificationFailedModal">
          <div className="w-full flex gap-[20px] flex-col items-center">
            <Image
              className="w-2/4 lg:w-1/4"
              src={
                'https://imaages-hosting-1fin.s3.ap-south-1.amazonaws.com/Website_team/Backend/Wrong_1745763938.svg'
              }
              alt="FailedLogo"
              width={50}
              height={50}
            />
            <div className="VerificationDescription">
              <h2>OTP Verification Failed!</h2>
              <p>Oops! It seems like there was an issue verifying your OTP.</p>
            </div>
            <div className="w-full lg:w-3/6">
              <CustomButtom
                text={'Retry'}
                color={true}
                onClick={() => {
                  setOtpValue('');
                  setErrorModal(false);
                }}
              />
            </div>
          </div>
          <div className="RequestCallBack lg:!hidden">
            <p>Need help or have any queries?</p>
            <div onClick={handleChatClick} className="ChatWithUsContent lg:!hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M17.0066 2.94C15.1066 1.04 12.5966 0 9.93657 0C4.48657 0 0.0565696 4.46 0.0565696 9.94C0.0565696 11.59 0.456573 13.2 1.21657 14.61L0.0265708 19.06C-0.0434292 19.31 0.0265732 19.59 0.216573 19.78C0.356573 19.92 0.546572 20 0.746572 20C0.806572 20 0.876574 19.99 0.936574 19.98L5.50657 18.78C6.88657 19.5 8.41657 19.88 9.93657 19.88C15.4866 19.88 19.9966 15.42 19.9966 9.94C19.9966 7.36 18.9366 4.87 17.0066 2.94ZM14.1666 13.25L13.3266 14.08C12.4466 14.96 10.1266 14 8.05657 11.93C5.99657 9.86999 5.06658 7.54 5.90657 6.66L6.73658 5.82001C6.83658 5.74001 7.04658 5.6 7.31658 5.59C7.56658 5.59 7.74656 5.70001 7.92656 5.82001C8.64656 6.32001 9.01657 6.57 9.15657 7.05C9.32657 7.63 9.10656 8.16 9.00656 8.36C9.06656 8.66 9.26657 9.45999 9.97657 10.15C10.6866 10.85 11.4866 11.05 11.7866 11.11C11.9766 10.98 12.4266 10.72 12.9366 10.83C13.3666 10.92 13.6266 11.31 14.1666 12.06C14.2766 12.22 14.3866 12.4 14.3966 12.64C14.3966 12.93 14.2466 13.15 14.1666 13.25Z"
                  fill="#4CAF50"
                />
              </svg>
              <p>Chat with us</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.00821 17.3008C6.61616 16.9871 6.55259 16.415 6.86623 16.023L11.2604 10.5303L6.86624 5.03763C6.55259 4.64558 6.61616 4.0735 7.00821 3.75985C7.40027 3.44621 7.97235 3.50977 8.28599 3.90183L13.1344 9.9624C13.4001 10.2944 13.4001 10.7662 13.1344 11.0982L8.28599 17.1588C7.97235 17.5508 7.40026 17.6144 7.00821 17.3008Z"
                  fill="#0A0A0A"
                />
              </svg>
            </div>
            <div className="CallBackClick" onClick={handleCall}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="18"
                viewBox="0 0 17 18"
                fill="none"
              >
                <path
                  d="M16.1724 12.9763L13.9082 10.6039C13.0996 9.75659 11.7249 10.0955 11.4015 11.197C11.1589 11.9596 10.3502 12.3832 9.62245 12.2137C8.00518 11.7901 5.82186 9.58713 5.41754 7.80783C5.17495 7.04524 5.66013 6.19796 6.38791 5.94381C7.43913 5.60489 7.76259 4.16451 6.95395 3.31722L4.68977 0.944825C4.04286 0.351725 3.07249 0.351725 2.50645 0.944825L0.970039 2.55467C-0.566371 4.24924 1.13177 8.73985 4.93236 12.7221C8.73295 16.7043 13.0187 18.5684 14.636 16.8738L16.1724 15.2639C16.7385 14.5861 16.7385 13.5694 16.1724 12.9763Z"
                  fill="#5B498E"
                />
              </svg>
              <p>Request a call back</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.50784 17.3008C7.11579 16.9871 7.05223 16.415 7.36587 16.023L11.76 10.5303L7.36587 5.03763C7.05223 4.64558 7.11579 4.0735 7.50784 3.75985C7.8999 3.44621 8.47198 3.50977 8.78562 3.90183L13.6341 9.9624C13.8997 10.2944 13.8997 10.7662 13.6341 11.0982L8.78562 17.1588C8.47198 17.5508 7.8999 17.6144 7.50784 17.3008Z"
                  fill="#0A0A0A"
                />
              </svg>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
