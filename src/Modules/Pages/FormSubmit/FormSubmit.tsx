'use client';
import React, { useEffect, useRef, useState } from 'react';
import FormInput from '@/Modules/components/FormInput';
import { useRouter } from 'next/navigation';
import { getStorage, updateStorage } from '@/Modules/utils/storage';
import { PaymentResponse, VerificationResponse } from '@/types';
import tax_api from '@/Modules/utils/axios';
import PaymentPage from '../Payment';
import moment from 'moment';
import Image from 'next/image';

export default function FormSubmit() {
  const router = useRouter()
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paymentResponse, setPaymentResponse] = useState<PaymentResponse | undefined>();

  function handleRetry() {
    setvalue({
      name: '',
      state: 'Select an option',
      email: '',
    })
    setPaymentResponse(undefined)
  }

const [data, setvalue] = useState<{ [key: string]: string}>({
    name: '',
    email: '',
    state: 'Select an option',
});
const wrapperRef = useRef<HTMLDivElement>(null);
const [cityarr, setcityarr] = useState(false);
const [statearr, setstatearr] = useState(false);
const [color, setcolor] = useState<boolean>(false);
const [errorModal, setErrorModal] = useState<{ [key: string]: string}>({
    name: '',
    state: '',
    email: '',
});

  const onPanInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, isRequired: boolean) => {
    if(isRequired){
      const inputValue = e.target.value;
      if (inputValue === '') {
        setErrorModal(prev => ({ ...prev, [e.target.name]: 'This field is required' }));
      } else {
        setErrorModal(prev => ({ ...prev, [e.target.name]: '' }));
      }
    }
  };

  function onPanInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void {
        //   const { name, value } = e.target;
        // onChangeValue(e);
        let { name, value } = e.target;
        
        switch(name){
          case "name":
            value = value.replace(/[^a-zA-Z\s]/g, '');
            break;
          case "email":
            const emailRegex =
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;

            const isValid =
              emailRegex.test(value) &&
              !value.includes('..') &&
              !value.endsWith('.');

            if (value && !isValid) {
              setErrorModal(prev => ({...prev, email: "Invalid email format"}))
              setcolor(false)
            }else{
              setErrorModal(prev => ({...prev, email: ""}))
            }
            break
        }
        setvalue((prev) => ({
          ...prev,
          [name]: value.trimStart(),
        }));
    }
  // const onChangeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  // };
  useEffect(() => {
    setcolor(data.name !== "" && data.state !== "Select an option" && errorModal.email == "");
  }, [data]);

const onClick = (name: string) => {
    console.log("name", name);
    if (name === "city") {
        setcityarr(true); 
    }
    if (name === "state") {
        setstatearr(true); 
    }
    
};


React.useEffect(() => {
  const data = getStorage<VerificationResponse>("verification");
  if (!data?.token){
    router.replace("/")
  }else{
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
    const handleClickOutside = (event: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            setcityarr(false);
            setstatearr(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, [router]);


  const handleSubmit = () => {
    tax_api.post("/website/generate-payment-link/",{...data}).then(({data}) => {
      setFormSubmitted(true)
      if(data.statusCode === 200){
        window.open(data.paymentLink);
      }
    }).catch(err => {
      console.log(err)
    })
  };

  const formData = [
    {
      label: 'Name',
      placeholder: 'Enter your full name',
      type: 'text',
      name:"name",
      required:true,
      options: false,
      areatext: false,
    },
    {
      label: 'State',
      placeholder: `Select an option`,
      type: 'text',
      name: "state",
      required: true,
      options: true,
      areatext: false,
    },
    {
      label: 'Email',
      placeholder: 'Enter email for invoice',
      type: 'email',
      name:"email",
      required:false,
      options: false,
      areatext: false,
    },
    // {
    //     label: 'City',
    //     placeholder: `Select an option`,
    //     type: 'text',
    //     name: "city",
    //     required: true,
    //     options: true,
    //     areatext: false,
    //   },
    // {
    //   label: 'Address',
    //   placeholder: `Enter your address`,
    //   type: 'text',
    //   name: "address",
    //   required: false,
    //   options: false,
    //   areatext: true,
    // }
  ];

  useEffect(() => {
    if(formSubmitted){
      checkPayment()
    }
  },[formSubmitted])

  function checkPayment() {
    let interval = setInterval(() => {
      tax_api.get(`/website/get-payment-log/`).then(({data}) => {
        console.log(data)
        if(data.status == "COMPLETED") {
          let paymentResponse = {
            status: data.status,
            invoice_lin: data.payment_invoice_link,
            transaction_id: data.payment_reference_number,
            created_at: data.created_at,
          }
          setPaymentResponse(paymentResponse)
          clearInterval(interval)
          setIsLoading(false)
        } else if(data.status == "FAILED") {
          let paymentResponse = {
            status: data.status,
            invoice_lin: "",
            transaction_id: "",
            created_at: moment().toISOString(),
          }
          setPaymentResponse(paymentResponse)
          setIsLoading(false)
          clearInterval(interval)
        } else if(data.status == "PAYMENT_INITIATED") {
          setIsLoading(true)
        }
      }).catch(err => {
        console.error(err)
      })
    },2000)
  }

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
        {
          paymentResponse ? (<PaymentPage paymentResponse={paymentResponse} handleRetry={handleRetry} />) : (
            <div className="flex flex-row justify-center pt-[60px] ">
              <div className="flex flex-col items-center max-sm:w-[360px] p-[80px] max-sm:pb-[30px] max-sm:p-[0px] rounded-[8px] bg-white">
                <div className="w-full flex flex-col items-center p-[50px] max-sm:p-[25px] rounded-[8px] bg-[#F6F6FC]">
                <Image
                    src="https://imaages-hosting-1fin.s3.ap-south-1.amazonaws.com/Website_team/Backend/Logo_1745575770.png"
                    width={60}
                    height={65}
                    alt="logo"
                  />
                <div className='pt-[30px] text-[#171717] text-center text-[20px] font-[400] leading-[32px] font-["spirits-soft"] pb-[30px]'>
                  Enter your details to proceed with payment of ₹2,499/-
                </div>
                <FormInput
                  value={data}
                  onChange={onPanInputChange}
                  onBlur={onPanInputBlur}
                  btn_disable={color && !isLoading}
                  handleSubmit={handleSubmit}
                  errorModal={errorModal}
                  formData={formData}
                  onClick={onClick} 
                  cityarr={cityarr}
                  statearr={statearr}
                  wrapperRef={wrapperRef}
                  setvalue={setvalue}
                  setstatearr={setstatearr}
                  setcityarr={setcityarr}
                />
                </div>
                {/* <div className='flex flex-col items-center bg-white pt-[30px]'>
                <div className='text-[#0A0A0A] text-center font-["Fira Sans"] text-[14px] font-light leading-5'>Need help or have any queries?</div>
                <div className='flex flex-row items-center gap-[8px] pt-[10px] cursor-pointer' onClick={handleCall}>
                    <svg className='block max-sm:hidden' xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
                    <path d="M16.1724 12.9763L13.9082 10.6039C13.0996 9.75659 11.7249 10.0955 11.4015 11.197C11.1589 11.9596 10.3502 12.3832 9.62245 12.2137C8.00518 11.7901 5.82186 9.58713 5.41754 7.80783C5.17495 7.04524 5.66013 6.19796 6.38791 5.94381C7.43913 5.60489 7.76259 4.16451 6.95395 3.31722L4.68977 0.944825C4.04286 0.351725 3.07249 0.351725 2.50645 0.944825L0.970039 2.55467C-0.566371 4.24924 1.13177 8.73985 4.93236 12.7221C8.73295 16.7043 13.0187 18.5684 14.636 16.8738L16.1724 15.2639C16.7385 14.5861 16.7385 13.5694 16.1724 12.9763Z" fill="#5B498E"/>
                    </svg>
                    <svg className='hidden max-sm:block' xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                    <path d="M17.5066 2.94C15.6066 1.04 13.0966 0 10.4366 0C4.98657 0 0.55657 4.46 0.55657 9.94C0.55657 11.59 0.956573 13.2 1.71657 14.61L0.526571 19.06C0.456571 19.31 0.526573 19.59 0.716573 19.78C0.856573 19.92 1.04657 20 1.24657 20C1.30657 20 1.37657 19.99 1.43657 19.98L6.00657 18.78C7.38657 19.5 8.91657 19.88 10.4366 19.88C15.9866 19.88 20.4966 15.42 20.4966 9.94C20.4966 7.36 19.4366 4.87 17.5066 2.94ZM14.6666 13.25L13.8266 14.08C12.9466 14.96 10.6266 14 8.55657 11.93C6.49657 9.86999 5.56658 7.54 6.40657 6.66L7.23658 5.82001C7.33658 5.74001 7.54658 5.6 7.81658 5.59C8.06658 5.59 8.24656 5.70001 8.42656 5.82001C9.14656 6.32001 9.51657 6.57 9.65657 7.05C9.82657 7.63 9.60656 8.16 9.50656 8.36C9.56656 8.66 9.76657 9.45999 10.4766 10.15C11.1866 10.85 11.9866 11.05 12.2866 11.11C12.4766 10.98 12.9266 10.72 13.4366 10.83C13.8666 10.92 14.1266 11.31 14.6666 12.06C14.7766 12.22 14.8866 12.4 14.8966 12.64C14.8966 12.93 14.7466 13.15 14.6666 13.25Z" fill="#4CAF50"/>
                    </svg>
                    <div className='text-[#0A0A0A] font-["Fira Sans"] text-[16px] font-medium leading-4 block max-sm:hidden'>Request a call back</div>
                    <div className='text-[#0A0A0A] font-["Fira Sans"] text-[16px] font-medium leading-4 hidden max-sm:block'>Chat with us</div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.50784 17.3008C7.11579 16.9871 7.05223 16.415 7.36587 16.023L11.76 10.5303L7.36587 5.03763C7.05223 4.64558 7.11579 4.0735 7.50784 3.75985C7.8999 3.44621 8.47198 3.50977 8.78562 3.90183L13.6341 9.9624C13.8997 10.2944 13.8997 10.7662 13.6341 11.0982L8.78562 17.1588C8.47198 17.5508 7.8999 17.6144 7.50784 17.3008Z" fill="#0A0A0A"/>
                    </svg>
                </div>
              </div> */}
              </div>
            </div>
          )
        }
      </div>
    </>
  );
}
