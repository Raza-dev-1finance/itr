export type VerificationResponse = {
  token: string;
  docs_uploaded: boolean;
  pan_submitted: boolean;
  payment_successful: boolean;
  personal_details_submitted: boolean;
};
