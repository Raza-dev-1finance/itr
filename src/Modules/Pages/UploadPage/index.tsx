'use client';
import Image from 'next/image';
import './index.css';
import { useEffect, useRef, useState } from 'react';
import UploadSuccess from '@/Modules/components/UploadSuccess';
import Modal from '@/Modules/components/Modal';
import CustomButtom from '@/Modules/components/CustomButtom';
import FilestoUpload from '@/Modules/components/FilestoUpload';
import { getStorage } from '@/Modules/utils/storage';
import { VerificationResponse } from '@/types';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const router = useRouter();
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [uploadedFiles, setUploadedFiles] = useState<number[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const data = getStorage<VerificationResponse>('verification');
    if (!data) {
      router.push('/');
    } else {
      // if (!data?.pan_submitted) {
      //   // Not pan -> Show pan page
      //   router.push('/pan');
      // } else if (!data?.personal_details_submitted) {
      //   // Not Address & Name -> Show address page
      //   router.push('/pan');
      // }
    }
    setUploadedFiles([]);
  }, [router]);

  function handleSubmit() {
    setUploadSuccess(true);
  }

  const handleClick = () => {
    fileRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles((prev) => [...prev, e.target.files![0]]);
    }
  };

  function addMoreDocument() {
    setUploadSuccess(false);
  }

  function handleAddMore() {
    if (files.length > 0 || uploadedFiles.length > 0) {
      handleClick();
    }
  }

  function handleCancel(index: number) {
    const temp = files;
    temp.splice(index, 1);
    setFiles([...temp]);
  }
  return (
    <>
      <div className="UploadMainContainer">
        {uploadSuccess ? (
          <UploadSuccess handleClick={addMoreDocument} />
        ) : (
          <div className="w-full flex items-center gap-[30px] flex-col">
            <Image
              src="https://imaages-hosting-1fin.s3.ap-south-1.amazonaws.com/Website_team/Backend/Logo_1745575770.png"
              width={60}
              height={65}
              alt="logo"
            />
            <div className="DocumentUploadContainer">
              <div className="DocumentUploadDescription w-full lg:w-5/6">
                <h2>Upload Your Documents</h2>
                <p>
                  Accepted formats: .TXT, .XLSX, .CSV, .JSON, .ZIP, .DOC, .DOCX, .PDF, .PNG, .JPG,
                  .JPEG
                </p>
                <span onClick={() => setOpenModal(true)}>
                  Check the full list of documents you need to file your ITR
                </span>
              </div>
              <div className="w-full lg:w-5/6 flex flex-col items-center gap-[20px]">
                <input
                  onChange={handleChange}
                  hidden
                  type="file"
                  ref={fileRef}
                  accept=".txt,.xlsx,.csv,.json,.zip,.doc,.docx,.pdf,.png,.jpg,.jpeg"
                />
                {uploadedFiles.length > 0 && (
                  <>
                    {uploadedFiles.map((e, index) => {
                      return (
                        <div
                          className="w-full flex justify-between items-center"
                          key={`fileInfo-${index}`}
                        >
                          <div className="flex gap-[8px] items-center">
                            <Image
                              className="h-auto"
                              src={`/icons/pdf.svg`}
                              width={30}
                              height={30}
                              alt="file_icon"
                            />
                            <div className="FileNames">
                              <p>Income Proof</p>
                              <span>20 MB</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="w-full h-0.5 bg-[#E5E5E5]"></div>
                  </>
                )}
                {!(uploadedFiles.length > 0 || files.length > 0) && (
                  <div className="UploadBtn" onClick={handleClick}>
                    <p>Uplaod</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                    >
                      <path
                        d="M6.8077 20.2695C6.30257 20.2695 5.875 20.0945 5.525 19.7445C5.175 19.3945 5 18.9669 5 18.4618V16.5003C5 16.2875 5.0718 16.1093 5.2154 15.9657C5.35898 15.8221 5.53718 15.7503 5.75 15.7503C5.96282 15.7503 6.14102 15.8221 6.2846 15.9657C6.42818 16.1093 6.49997 16.2875 6.49997 16.5003V18.4618C6.49997 18.5387 6.53202 18.6093 6.59612 18.6734C6.66024 18.7375 6.73077 18.7695 6.8077 18.7695H18.1922C18.2692 18.7695 18.3397 18.7375 18.4038 18.6734C18.4679 18.6093 18.5 18.5387 18.5 18.4618V16.5003C18.5 16.2875 18.5718 16.1093 18.7154 15.9657C18.8589 15.8221 19.0371 15.7503 19.25 15.7503C19.4628 15.7503 19.641 15.8221 19.7845 15.9657C19.9281 16.1093 20 16.2875 20 16.5003V18.4618C20 18.9669 19.825 19.3945 19.475 19.7445C19.125 20.0945 18.6974 20.2695 18.1922 20.2695H6.8077ZM11.75 8.15796L9.82692 10.081C9.67821 10.2298 9.50161 10.3032 9.29712 10.3012C9.09264 10.2993 8.91283 10.2208 8.7577 10.0657C8.61283 9.91053 8.53784 9.73489 8.53272 9.53876C8.52759 9.34261 8.60258 9.16697 8.7577 9.01183L11.8673 5.90226C11.9609 5.80868 12.0596 5.74265 12.1634 5.70418C12.2673 5.66572 12.3795 5.64648 12.5 5.64648C12.6205 5.64648 12.7327 5.66572 12.8365 5.70418C12.9404 5.74265 13.0391 5.80868 13.1327 5.90226L16.2422 9.01183C16.391 9.16055 16.4644 9.33458 16.4624 9.53393C16.4605 9.73328 16.3871 9.91053 16.2422 10.0657C16.0871 10.2208 15.9089 10.3009 15.7077 10.306C15.5064 10.3112 15.3282 10.2362 15.173 10.081L13.2499 8.15796V15.808C13.2499 16.0208 13.1782 16.199 13.0346 16.3426C12.891 16.4862 12.7128 16.558 12.5 16.558C12.2872 16.558 12.109 16.4862 11.9654 16.3426C11.8218 16.199 11.75 16.0208 11.75 15.808V8.15796Z"
                        fill="#0A0A0A"
                      />
                    </svg>
                  </div>
                )}
                {files.length > 0 &&
                  files.map((e, index) => {
                    const extension = e.name.split('.').pop()?.toLowerCase();
                    const sizeInBytes = e.size;
                    const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
                    return (
                      <div className="flex flex-col gap-[10px]" key={`fileInfo-${index}`}>
                        <div className="w-full flex justify-between items-center">
                          <div className="flex gap-[8px] items-center">
                            <Image
                              className="h-auto"
                              src={`/icons/${extension}.svg`}
                              width={30}
                              height={30}
                              alt="file_icon"
                            />
                            <div className="FileNames">
                              <p>{e.name}</p>
                              <span>{sizeInMB} MB</span>
                            </div>
                          </div>
                          <svg
                            onClick={() => handleCancel(index)}
                            className="cursor-pointer"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="21"
                            viewBox="0 0 20 21"
                            fill="none"
                          >
                            <path
                              d="M10.0002 11.6477L5.77265 15.8753C5.65727 15.9907 5.51225 16.0497 5.33757 16.0524C5.1629 16.055 5.01521 15.996 4.89448 15.8753C4.77375 15.7545 4.71338 15.6082 4.71338 15.4362C4.71338 15.2642 4.77375 15.1178 4.89448 14.9971L9.12205 10.7695L4.89448 6.54194C4.77909 6.42656 4.72007 6.28153 4.7174 6.10685C4.71472 5.93219 4.77375 5.78449 4.89448 5.66377C5.01521 5.54303 5.16157 5.48267 5.33357 5.48267C5.50557 5.48267 5.65193 5.54303 5.77265 5.66377L10.0002 9.89133L14.2278 5.66377C14.3432 5.54838 14.4882 5.48935 14.6629 5.48669C14.8376 5.48401 14.9853 5.54303 15.106 5.66377C15.2267 5.78449 15.2871 5.93085 15.2871 6.10285C15.2871 6.27485 15.2267 6.42121 15.106 6.54194L10.8784 10.7695L15.106 14.9971C15.2214 15.1125 15.2804 15.2575 15.2831 15.4322C15.2857 15.6069 15.2267 15.7545 15.106 15.8753C14.9853 15.996 14.8389 16.0564 14.6669 16.0564C14.4949 16.0564 14.3485 15.996 14.2278 15.8753L10.0002 11.6477Z"
                              fill="#0A0A0A"
                            />
                          </svg>
                        </div>
                        <div className="flex gap-[5px] items-center errorPassword">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none"
                          >
                            <path
                              d="M3.42546 21.0142C3.25596 21.0142 3.10371 20.9728 2.96871 20.89C2.83371 20.8071 2.72879 20.6979 2.65396 20.5622C2.57596 20.4275 2.53304 20.2817 2.52521 20.1247C2.51738 19.9677 2.55971 19.8122 2.65221 19.6582L11.213 4.87021C11.3056 4.71621 11.4215 4.60238 11.5605 4.52871C11.6996 4.45505 11.8461 4.41821 12 4.41821C12.1538 4.41821 12.3003 4.45505 12.4395 4.52871C12.5785 4.60238 12.6943 4.71621 12.787 4.87021L21.3477 19.6582C21.4402 19.8122 21.4825 19.9677 21.4747 20.1247C21.4669 20.2817 21.424 20.4275 21.346 20.5622C21.2711 20.6979 21.1662 20.8071 21.0312 20.89C20.8962 20.9728 20.744 21.0142 20.5745 21.0142H3.42546ZM4.44996 19.5142H19.55L12 6.51421L4.44996 19.5142ZM12 18.322C12.2288 18.322 12.4206 18.2445 12.5755 18.0897C12.7303 17.9349 12.8077 17.743 12.8077 17.5142C12.8077 17.2854 12.7303 17.0935 12.5755 16.9387C12.4206 16.7839 12.2288 16.7065 12 16.7065C11.7711 16.7065 11.5793 16.7839 11.4245 16.9387C11.2696 17.0935 11.1922 17.2854 11.1922 17.5142C11.1922 17.743 11.2696 17.9349 11.4245 18.0897C11.5793 18.2445 11.7711 18.322 12 18.322ZM12.0002 15.7065C12.2129 15.7065 12.391 15.6346 12.5345 15.491C12.6781 15.3471 12.75 15.169 12.75 14.9565V11.4565C12.75 11.244 12.678 11.0659 12.5342 10.9222C12.3904 10.7784 12.2122 10.7065 11.9997 10.7065C11.787 10.7065 11.609 10.7784 11.4655 10.9222C11.3218 11.0659 11.25 11.244 11.25 11.4565V14.9565C11.25 15.169 11.3219 15.3471 11.4657 15.491C11.6095 15.6346 11.7877 15.7065 12.0002 15.7065Z"
                              fill="#EF4444"
                            />
                          </svg>
                          <p>
                            This file is password protected, please add the password below and
                            submit.{' '}
                          </p>
                        </div>
                        <input placeholder="Add Password" type="text" className="PasswordField" />
                      </div>
                    );
                  })}
                <div className="AddMoreFile" onClick={handleAddMore}>
                  <p>Add more</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                  >
                    <path
                      d="M9.89051 8.45775L9.92585 12.9479M7.66311 10.6852L12.1533 10.7205M17.7082 10.7695C17.7082 15.0267 14.257 18.4778 9.99984 18.4778C5.74264 18.4778 2.2915 15.0267 2.2915 10.7695C2.2915 6.5123 5.74264 3.06116 9.99984 3.06116C14.257 3.06116 17.7082 6.5123 17.7082 10.7695Z"
                      stroke="#1A1A1A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col gap-[15px] items-center w-full lg:w-5/6">
                <CustomButtom text={'Submit'} color={files.length > 0} onClick={handleSubmit} />
                <p className="NoteDescription w-5/6 lg:w-3/6 text-center">
                  <b>Note:</b> Once documents are submitted, you cannot delete or edit them
                </p>
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
        )}
      </div>
      <Modal open={openModal} setOpen={setOpenModal} modalCentreCls="rounded-[10px]">
        <FilestoUpload />
      </Modal>
    </>
  );
}
