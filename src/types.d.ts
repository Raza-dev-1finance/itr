export type VerificationResponse = {
  token: string;
  docs_uploaded: boolean;
  pan_submitted: boolean;
  payment_successful: boolean;
  personal_details_submitted: boolean;
};

export type PaymentResponse = {
  status: string,
  invoice_lin: string,
  transaction_id: string,
  created_at: string,
}