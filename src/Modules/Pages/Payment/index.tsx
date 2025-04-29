'use client';
import Image from 'next/image';
import './Payment.css';
import CustomButtom from '@/Modules/components/CustomButtom';
import { useRouter } from 'next/navigation';
import { PaymentResponse, VerificationResponse } from '@/types';
import { useCallback, useEffect } from 'react';
import { updateStorage } from '@/Modules/utils/storage';
import moment from 'moment';

type PaymentPageProps = {
  paymentResponse: PaymentResponse,
  handleRetry: () => void
}

export default function PaymentPage({ paymentResponse, handleRetry }: PaymentPageProps) {
  const router = useRouter();

  useEffect(() => {
    if (paymentResponse.status === "Compelted") {
      updateStorage("verification", {personal_details_submitted: true, payment_successful: true})
    }
  }, [paymentResponse.status])

  function handleGetStarted() {
    router.push("/document-upload");
  }

  const copyToClipboard = async (text: string) => {
    if (typeof window !== "undefined" && "clipboard" in navigator) {
      try {
        await navigator.clipboard.writeText(text);
        console.log("✅ Copied:", text);
      } catch (error) {
        console.error("❌ Copy failed:", error);
      }
    } else {
      console.warn("⚠️ Clipboard API not available in this context.");
    }
  };



  const copySvg = (
    <svg onClick={() => copyToClipboard(paymentResponse.transaction_id || "working")} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M3.3335 15.9529C3.3335 16.3576 3.49423 16.7456 3.78035 17.0317C4.06646 17.3178 4.45451 17.4786 4.85914 17.4786H11.9788C12.3834 17.4786 12.7715 17.3178 13.0576 17.0317C13.3437 16.7456 13.5044 16.3576 13.5044 15.9529V15.4444H15.0301C15.4347 15.4444 15.8228 15.2837 16.1089 14.9975C16.395 14.7114 16.5557 14.3234 16.5557 13.9188V3.74781C16.5557 3.34318 16.395 2.95513 16.1089 2.66902C15.8228 2.3829 15.4347 2.22217 15.0301 2.22217H7.91042C7.50579 2.22217 7.11774 2.3829 6.83163 2.66902C6.54551 2.95513 6.38478 3.34318 6.38478 3.74781V4.25636H4.85914C4.45451 4.25636 4.06646 4.41709 3.78035 4.70321C3.49423 4.98932 3.3335 5.37737 3.3335 5.782V15.9529ZM7.40187 3.74781C7.40187 3.61293 7.45545 3.48358 7.55082 3.38821C7.64619 3.29284 7.77554 3.23926 7.91042 3.23926H15.0301C15.165 3.23926 15.2943 3.29284 15.3897 3.38821C15.485 3.48358 15.5386 3.61293 15.5386 3.74781V13.9188C15.5386 14.0536 15.485 14.183 15.3897 14.2783C15.2943 14.3737 15.165 14.4273 15.0301 14.4273H13.5044V5.782C13.5044 5.37737 13.3437 4.98932 13.0576 4.70321C12.7715 4.41709 12.3834 4.25636 11.9788 4.25636H7.40187V3.74781ZM4.35059 5.782C4.35059 5.64712 4.40417 5.51777 4.49954 5.4224C4.59491 5.32703 4.72426 5.27345 4.85914 5.27345H11.9788C12.1137 5.27345 12.243 5.32703 12.3384 5.4224C12.4338 5.51777 12.4873 5.64712 12.4873 5.782V15.9529C12.4873 16.0878 12.4338 16.2172 12.3384 16.3125C12.243 16.4079 12.1137 16.4615 11.9788 16.4615H4.85914C4.72426 16.4615 4.59491 16.4079 4.49954 16.3125C4.40417 16.2172 4.35059 16.0878 4.35059 15.9529V5.782Z"
        fill="#1A1A1A"
      />
    </svg>
  );

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row items-center justify-between lg:justify-center lg:pt-[60px] min-h-screen py-15">
        {paymentResponse.status === "Compelted" ? (
          <div className="flex flex-col gap-[30px] items-center w-11/12 lg:w-[610px] py-15 lg:p-[80px] rounded-[8px] lg:bg-white">
            <Image
              src="https://imaages-hosting-1fin.s3.ap-south-1.amazonaws.com/Website_team/Backend/Logo_1745575770.png"
              width={60}
              height={65}
              alt="logo"
            />
            <div className="w-full flex flex-col items-center gap-[10px] bg-[#FFF] p-5 rounded-[2px] lg:rounded-[0px] lg:p-0 lg:bg-none">
              <div className="PaymentSuccess">
                <Image
                  src="https://imaages-hosting-1fin.s3.ap-south-1.amazonaws.com/Website_team/Backend/PaymentSuccess_1745758749.svg"
                  width={60}
                  height={60}
                  alt="logo"
                />
                <p>Payment Successful</p>
              </div>
              <p className="InvoiceAmount">₹2,499</p>
              <div className="InvoiceDetail">
                <p>{moment(paymentResponse.created_at).format("Do MMMM YYYY | h:mm A")}</p>
                <span>
                  Transaction ID: HSKCCtrBBSye
                  {copySvg}
                </span>
              </div>
            </div>
            <a href={paymentResponse.invoice_lin} target='_blank'>
              <Image
                className="w-full cursor-pointer hidden lg:block"
                src="https://imaages-hosting-1fin.s3.ap-south-1.amazonaws.com/Website_team/Backend/InvoiceBtn_1745758652.svg"
                alt="InvoiceBtn"
                width={50}
                height={50}
              />
              <Image
                className="w-auto cursor-pointer block lg:hidden"
                src="https://imaages-hosting-1fin.s3.ap-south-1.amazonaws.com/Website_team/Backend/Logo_ButtonsMob_1745855136.svg"
                alt="InvoiceBtn"
                width={40}
                height={50}
              />
            </a>
            <CustomButtom
              text={'Get Started'}
              color={true}
              onClick={handleGetStarted}
              cls="hidden lg:block"
            />
            <div className="RequestCallBackPayment">
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
        ) : (
          <div className="flex flex-col gap-[30px] items-center w-[610px] p-[80px] rounded-[8px] lg:bg-white">
            <div className="FailureContainer">
              <Image
                src="https://imaages-hosting-1fin.s3.ap-south-1.amazonaws.com/Website_team/Backend/Logo_1745575770.png"
                width={60}
                height={65}
                alt="logo"
              />
              <div className="FailureDetails">
                <div className="PaymentSuccess">
                  <Image
                    src="https://imaages-hosting-1fin.s3.ap-south-1.amazonaws.com/Website_team/Backend/PaymentFail_1745760095.svg"
                    width={60}
                    height={60}
                    alt="logo"
                  />
                  <p>Payment Failed</p>
                </div>
                <p className="InvoiceAmount">₹2,499</p>
                <div className="InvoiceDetail">
                  <p>18th May 2025 | 2:31 PM</p>
                </div>
              </div>
              <CustomButtom
                text={'Retry'}
                color={true}
                onClick={() => { if (!(paymentResponse.status === "Compelted")) { handleRetry() } }}
                cls="hidden lg:block"
              />
            </div>
            <div className="RequestCallBackPayment">
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
        )}
        <div className="w-11/12 lg:hidden mx-auto">
          <CustomButtom
            text={paymentResponse.status === "Compelted" ? 'Get Started' : 'Retry'}
            color={true}
            onClick={() => { if (!(paymentResponse.status === "Compelted")) { handleRetry() } }}
          />
        </div>
      </div>
    </div>
  );
}
