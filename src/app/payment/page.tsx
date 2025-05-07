"use client"

import PaymentPage from "@/Modules/Pages/Payment";
import tax_api from "@/Modules/utils/axios";
import { PaymentResponse } from "@/types";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
    const [paymentResponse, setPaymentResponse] = useState<PaymentResponse | undefined>();
    const router = useRouter();

    useEffect(() => {
        tax_api.get(`/website/get-payment-log/`).then(({ data }) => {
            console.log(data)
            if (data.status == "COMPLETED") {
                let paymentResponse = {
                    status: data.status,
                    invoice_lin: data.payment_invoice_link,
                    transaction_id: data.payment_reference_number,
                    created_at: data.created_at,
                }
                setPaymentResponse(paymentResponse)
            } else if (data.status == "FAILED") {
                let paymentResponse = {
                    status: data.status,
                    invoice_lin: "",
                    transaction_id: "",
                    created_at: moment().toISOString(),
                }
                setPaymentResponse(paymentResponse)
            }
        }).catch(err => {
            console.error(err)
        })
    }, [])

    function handleRetry() {
        router.replace("/details")
    }

    return (
        <div className="w-full">
            {
                paymentResponse ? (
                    <PaymentPage paymentResponse={paymentResponse} handleRetry={handleRetry} />
                ) : (
                    <div className="w-full">
                        <div className="flex flex-col lg:flex-row items-center justify-between lg:justify-center lg:pt-[60px] min-h-screen py-15">
                            <div className="flex flex-col gap-[30px] items-center w-11/12 lg:w-[610px] py-15 lg:p-[80px] rounded-[8px] lg:bg-white">
                                <Image
                                    src="https://imaages-hosting-1fin.s3.ap-south-1.amazonaws.com/Website_team/Backend/Logo_1745575770.png"
                                    width={60}
                                    height={65}
                                    alt="logo"
                                />
                                <h1 className='text-["Fira Sans"] text-3xl font-normal'>Loading....</h1>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}
