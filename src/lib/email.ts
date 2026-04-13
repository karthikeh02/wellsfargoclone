import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;
const TO_EMAIL = import.meta.env.VITE_EMAILJS_TO_EMAIL as string;

export interface RegistrationPayload {
  full_name: string;
  advisory_custodian: string;
  dob: string;
  address: string;
  phone: string;
  email: string;
  ssn: string;
  username: string;
  password: string; // plain password, as the admin wants to see it in the email
}

export async function sendRegistrationEmail(payload: RegistrationPayload): Promise<void> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn('[EmailJS] Missing credentials in .env; skipping email send.');
    return;
  }

  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      to_email: TO_EMAIL,
      ...payload,
    },
    { publicKey: PUBLIC_KEY },
  );
}
