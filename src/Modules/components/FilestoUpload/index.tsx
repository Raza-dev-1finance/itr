import Link from 'next/link';
import './index.css';

export default function FilestoUpload() {
  const downloadSvg = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
      <path
        d="M12 15.9115C11.8795 15.9115 11.7673 15.8923 11.6634 15.8538C11.5596 15.8154 11.4609 15.7493 11.3673 15.6557L8.2577 12.5462C8.10898 12.3974 8.03559 12.2234 8.03753 12.0241C8.03944 11.8247 8.11283 11.6475 8.2577 11.4923C8.41283 11.3372 8.59103 11.2571 8.7923 11.252C8.99358 11.2468 9.17179 11.3218 9.32692 11.477L11.25 13.4V5.75C11.25 5.53718 11.3218 5.35898 11.4654 5.2154C11.609 5.0718 11.7872 5 12 5C12.2128 5 12.391 5.0718 12.5346 5.2154C12.6782 5.35898 12.7499 5.53718 12.7499 5.75V13.4L14.673 11.477C14.8217 11.3282 14.9983 11.2548 15.2028 11.2568C15.4073 11.2587 15.5871 11.3372 15.7422 11.4923C15.8871 11.6475 15.9621 11.8231 15.9672 12.0193C15.9724 12.2154 15.8974 12.391 15.7422 12.5462L12.6327 15.6557C12.5391 15.7493 12.4404 15.8154 12.3365 15.8538C12.2327 15.8923 12.1205 15.9115 12 15.9115ZM6.3077 20C5.80257 20 5.375 19.825 5.025 19.475C4.675 19.125 4.5 18.6974 4.5 18.1923V16.2307C4.5 16.0179 4.5718 15.8397 4.7154 15.6961C4.85898 15.5525 5.03718 15.4808 5.25 15.4808C5.46282 15.4808 5.64102 15.5525 5.7846 15.6961C5.92818 15.8397 5.99997 16.0179 5.99997 16.2307V18.1923C5.99997 18.2692 6.03202 18.3397 6.09612 18.4038C6.16024 18.4679 6.23077 18.5 6.3077 18.5H17.6922C17.7692 18.5 17.8397 18.4679 17.9038 18.4038C17.9679 18.3397 18 18.2692 18 18.1923V16.2307C18 16.0179 18.0718 15.8397 18.2154 15.6961C18.3589 15.5525 18.5371 15.4808 18.75 15.4808C18.9628 15.4808 19.141 15.5525 19.2845 15.6961C19.4281 15.8397 19.5 16.0179 19.5 16.2307V18.1923C19.5 18.6974 19.325 19.125 18.975 19.475C18.625 19.825 18.1974 20 17.6922 20H6.3077Z"
        fill="#5B498E"
      />
    </svg>
  );
  return (
    <div className="w-full lg:h-[550px] lg:overflow-scroll">
      <div className="flex flex-col items-start gap-5 w-full">
        <h3 className="StaticModalTitle">
          Check the full list of documents you need to file your ITR
        </h3>
        <Link
          target="_blank"
          href="https://imaages-hosting-1fin.s3.ap-south-1.amazonaws.com/Website_team/Backend/ListofDocumentsforITRFilingFY2024-25_1745840119.pdf"
          className="StaticModalDownloadLink"
        >
          Download PDF {downloadSvg}
        </Link>
        <div className="StaticContent">
          <h3>List of Documents for F.Y. 2024-25 (A.Y. 2025-26)</h3>
          <ol className="list-decimal list-outside pl-5">
            <li>26AS</li>
            <li>AIS</li>
            <li>TIS</li>
            <li>Form 16 from all employers (present, ex-employer)</li>
            <li>Tax Computation from HR Portal (for salary breakup)</li>
            <li>
              Full and Final Settlement statement (in case of job switch during the financial year)
            </li>
            <li>House Rent Agreement/ Rent Receipts (if HRA not claimed in Form 16)</li>
            <li>Rent Agreement (in case of rental income)</li>
            <li>Municipal Tax paid receipts (in case of rental income)</li>
            <li>Home Loan Repayment Certificate</li>
            <li>
              Interest certificates from banks/post office (for savings or Fixed Deposit Interest)
            </li>
            <li>Dividend Income Statement (from sharebroker for all Demat Accounts)</li>
            <li>
              Documents for claiming deductions and exemption (For 80C - PPF, Life insurance premium
              receipts ; For 80D - health insurance/mediclaim receipts ; For 80GG - Rent agreement
              /rent paid ; For 80G - Donation receipts, etc.)
            </li>
            <li>Aadhaar copy (for mentioning in ITR)</li>
            <li>Details of Bank Accounts held during the year</li>
            <li>Last year&apos;s ITR and Computation of Total Income</li>
          </ol>
        </div>
        <div className="StaticContent">
          <h3>
            Have you sold any capital assets like shares, mutual funds, etc. or traded in Futures &
            Options during the year ?
          </h3>
          <ol className="list-decimal list-outside pl-5">
            <li>
              Capital Gain Statement / Tax Profit and Loss Statement from sharebroker for all Demat
              Accounts (if possible in excel as well as pdf)
            </li>
            <li>Capital Gain Statement for Mutual Funds from MF Central Website</li>
          </ol>
        </div>
        <div className="StaticContent">
          <h3>Have you sold any property during the year ?</h3>
          <ol className="list-decimal list-outside pl-5">
            <li>Type of property</li>
            <li>Full address of the property</li>
            <li>Sale deed (date of sale, sale value)</li>
            <li>Stamp Duty Value</li>
            <li>Ownership details (share of each owner in case of multiple owners)</li>
            <li>Purchase deed (date of purchase, purchase value)</li>
            <li>Details of cost of improvement</li>
            <li>Transfer charges (brokerage, stamp duty paid, registration charges)</li>
            <li>Documents for claiming exemption (u/s 54,54EC,54F, etc)</li>
          </ol>
        </div>
        <div className="StaticContent">
          <h3>Do you have any Business/Professional Income ?</h3>
          <ol className="list-decimal list-outside pl-5">
            <li>Details of Turnover / Gross Receipts and Expenses for the year</li>
            <li>
              GSTR3B Summary (if business turnover exceeds ₹ 40 Lakhs / Professional Receipts are
              above ₹ 20 Lakhs)
            </li>
          </ol>
        </div>
        <div className="StaticContent">
          <h3>Do you have a Total Income above 50 lakhs ?</h3>
          <p>
            Details of Asset and Liabilities (
            <Link
              target="_blank"
              href={
                'https://docs.google.com/spreadsheets/d/1MNe9NY6VmxK8xcGTJFOVImXziU25E44a/edit#gid=965401715'
              }
            >
              Asset and liability Template
            </Link>
            ){' '}
          </p>
        </div>
        <div className="StaticContent">
          <h3>Do you hold any Foreign Assets / Income (RSUs, ESOPs) ?</h3>
          <ol className="list-decimal list-outside pl-5">
            <li>
              Foreign Demat Account Holding Statement showing the following for all the units held
              till date 31st March, 2025
            </li>
            <li>Capital Gain Statement / Tax Profit and Loss Statement</li>
            <li>Details of Foreign assets held (Bank Accounts, House Property etc.)</li>
          </ol>
        </div>
        <div className="StaticContent">
          <h3>Incase you are an NRI - </h3>
          <ol className="list-decimal list-outside pl-5">
            <li>Country of Residence</li>
            <li>
              Tax Identification number of that country (if not available then Passport number)
            </li>
            <li>Total period of stay in India during the financial year 2024-25 (in days)</li>
            <li>Total period of stay in India during last 4 financial years (in days)</li>
            <li>Tax Residency Certificate</li>
          </ol>
        </div>
        <div className="StaticContent">
          <h3>Any other Documents</h3>
        </div>
      </div>
    </div>
  );
}
