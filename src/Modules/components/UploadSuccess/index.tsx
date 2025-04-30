import Image from 'next/image';
import './index.css';
import CustomButtom from '../CustomButtom';
import tax_api from '@/Modules/utils/axios';

type UploadSuccessProps = {
  handleClick: () => void;
};

export default function UploadSuccess({ handleClick }: UploadSuccessProps) {
  function handleCall() {
    tax_api.post("/website/request-callback").then((res) => {
      console.log({res})
    }).catch(err => {
      console.error(err)
    })
  }
  return (
    <div className="w-full flex items-center gap-[50px] flex-col">
      <Image
        src="https://imaages-hosting-1fin.s3.ap-south-1.amazonaws.com/Website_team/Backend/Logo_1745575770.png"
        width={60}
        height={65}
        alt="logo"
      />
      <div className="UploadSuccessMsg">
        <div className="flex gap-[10px] flex-col items-center UploadMsg">
          <Image
            src="https://imaages-hosting-1fin.s3.ap-south-1.amazonaws.com/Website_team/Backend/Documents_submitted_1745768952.svg"
            width={60}
            height={65}
            alt="logo"
          />
          <h4>Documents Submitted Successfully </h4>
          <p>Our team will get back to you shortly</p>
        </div>
        <div className="w-5/6">
          <CustomButtom text={'Add more documents'} onClick={() => handleClick()} color={true} />
        </div>
      </div>
      {/* <div className="RequestCallBack">
        <p>Need help or have any queries?</p>
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
      </div> */}
    </div>
  );
}
