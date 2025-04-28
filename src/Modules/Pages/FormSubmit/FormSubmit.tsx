'use client';
import React, { useRef, useState } from 'react';
import FormInput from '@/Modules/components/FormInput';

export default function FormSubmit() {
const [value, setvalue] = useState<{ [key: string]: string}>({
    name: '',
    city: '',
    state: '',
    address: '',
});
const wrapperRef = useRef<HTMLDivElement>(null);
const [cityarr, setcityarr] = useState(false);
const [statearr, setstatearr] = useState(false);
const [color, setcolor] = useState<boolean>(false);
const [errorModal, setErrorModal] = useState<boolean>(false);

  const onPanInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const inputValue = e.target.value;

  };
  const onPanInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onChangeValue(e);
  };
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setvalue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
const onClick = (name: string) => {
    console.log("name", name);
    if (name === "city") {
        setstatearr(false);
        setcityarr((prev) => !prev && !cityarr);
    }
    if (name === "state") {
        setstatearr((prev) => !prev && !statearr);
        setcityarr(false);
    }
};

console.log("value", value);

React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            console.log("clicked outside");
            setcityarr(false);
            setstatearr(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, []);


  const handleSubmit = () => {
    // if (value?.length === 10&&!color) {
    //   console.log('Phone number submitted:', value);
    // } else {
    //   console.log('Invalid phone number');
    // }
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
        label: 'City',
        placeholder: `Select an option`,
        type: 'text',
        name: "city",
        required: true,
        options: true,
        areatext: false,
      },
    {
      label: 'Address',
      placeholder: `Enter your address`,
      type: 'text',
      name: "address",
      required: false,
      options: false,
      areatext: true,
    }
  ];


  return (
    <>
      <div className="w-full">
        <div className="flex flex-row justify-center pt-[60px] ">
          <div className="flex flex-col items-center w-[610px] max-sm:w-[325px] p-[80px] rounded-[8px] bg-white">
            <div className="w-full flex flex-col items-center p-[50px] rounded-[8px] bg-[#F6F6FC] mt-[30px]">
            <div className='pt-[30px] text-[#171717] text-center text-[20px] font-[400] leading-[32px] font-["spirits-soft"] pb-[30px]'>
              Enter your details to proceed with payment of ₹2,499/-
            </div>
             <FormInput
              value={value}
              onChange={onPanInputChange}
              onBlur={onPanInputBlur}
              btn_disable={color}
              handleSubmit={handleSubmit}
              errorModal={errorModal}
              formData={formData}
              onClick={onClick} 
              cityarr={cityarr}
              statearr={statearr}
              wrapperRef={wrapperRef}
              setvalue={setvalue}
             />
            </div>
            <div className='flex flex-col items-center bg-white pt-[30px]'>
            <div className='text-[#0A0A0A] text-center font-["Fira Sans"] text-[14px] font-light leading-5'>Need help or have any queries?</div>
            <div className='flex flex-row items-center gap-[8px] pt-[10px] cursor-pointer' onClick={() => window.open('https://wa.me/919999999999?text=Hello%20I%20need%20help%20with%20my%20PAN%20verification', '_blank')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
                <path d="M16.1724 12.9763L13.9082 10.6039C13.0996 9.75659 11.7249 10.0955 11.4015 11.197C11.1589 11.9596 10.3502 12.3832 9.62245 12.2137C8.00518 11.7901 5.82186 9.58713 5.41754 7.80783C5.17495 7.04524 5.66013 6.19796 6.38791 5.94381C7.43913 5.60489 7.76259 4.16451 6.95395 3.31722L4.68977 0.944825C4.04286 0.351725 3.07249 0.351725 2.50645 0.944825L0.970039 2.55467C-0.566371 4.24924 1.13177 8.73985 4.93236 12.7221C8.73295 16.7043 13.0187 18.5684 14.636 16.8738L16.1724 15.2639C16.7385 14.5861 16.7385 13.5694 16.1724 12.9763Z" fill="#5B498E"/>
                </svg>
                <div className='text-[#0A0A0A] font-["Fira Sans"] text-[16px] font-medium leading-4'>Request a call back</div>
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.50784 17.3008C7.11579 16.9871 7.05223 16.415 7.36587 16.023L11.76 10.5303L7.36587 5.03763C7.05223 4.64558 7.11579 4.0735 7.50784 3.75985C7.8999 3.44621 8.47198 3.50977 8.78562 3.90183L13.6341 9.9624C13.8997 10.2944 13.8997 10.7662 13.6341 11.0982L8.78562 17.1588C8.47198 17.5508 7.8999 17.6144 7.50784 17.3008Z" fill="#0A0A0A"/>
                </svg>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
