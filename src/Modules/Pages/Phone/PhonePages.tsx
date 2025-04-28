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
      router.push('/pan');
    } else if (!data.personal_details_submitted) {
      // Not Address & Name -> Show address page
      router.push('/details?show=personal');
    } else if (data.payment_successful) {
      // Payment is done -> Show documnet upload page
      router.push('/document-upload');
    }
  }

  useEffect(() => {
    const sessionDetails = getStorage<VerificationResponse>('token');
    if (sessionDetails && sessionDetails?.token) {
      if (!sessionDetails.pan_submitted) {
        // Not pan -> Show pan page
        router.push('/pan');
      } else if (!sessionDetails.personal_details_submitted) {
        // Not Address & Name -> Show address page
        router.push('/details?show=personal');
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
    } else {
      console.log('Valid phone number');
    }
  };
  const onPhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!/^[6-9]\d{0,9}$/.test(inputValue) && inputValue !== '') {
      return;
    }
    onChangeValue(inputValue);
    if (inputValue.length == 10) {
      setcolor(true);
    } else {
      setcolor(false);
    }
  };
  const onChangeValue = (value: string) => {
    setvalue(value);
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
      sendOtp(value);
    }
  };

  const handleSubmit = () => {
    if (value?.length === 10) {
      sendOtp(value);
      setOtpState(true);
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="flex flex-row justify-center pt-[60px]">
          <div className="flex flex-col items-center w-[610px] p-[80px] rounded-[8px] bg-white">
            <Image
              src="https://imaages-hosting-1fin.s3.ap-south-1.amazonaws.com/Website_team/Backend/Logo_1745575770.png"
              width={60}
              height={65}
              alt="logo"
            />
            <div className='pt-[30px] text-[#0A0A0A] text-center text-[36px] font-[500] leading-[44px] font-["spirits-soft"]'>
              File Your ITR Right With Our CAs:<br></br>Save Tax, Stay Compliant
            </div>
            <div className="w-full flex flex-col items-center p-[50px] rounded-[8px] bg-[#F6F6FC] mt-[30px]">
              {otpState ? (
                <OtpInput
                  btn_disable={otpValue.length == OTP_LENGTH}
                  handleSubmit={verifyOtp}
                  length={OTP_LENGTH}
                  setOptCombine={setOtpValue}
                  resendOtp={resendOtp}
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
      </div>
      <Modal open={errorModal} setOpen={setErrorModal} modalCentreCls="rounded-[2px]">
        <div className="VerificationFailedModal">
          <div className="w-full flex gap-[20px] flex-col items-center">
            <Image
              className="w-1/4"
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
            <div className="w-3/6">
              <CustomButtom
                text={'Retry'}
                color={true}
                onClick={() => {
                  setErrorModal(false);
                }}
              />
            </div>
          </div>
          <div className="RequestCallBack">
            <p>Need help or have any queries?</p>
            <div className="CallBackClick">
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
