import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;
const TO_EMAIL = import.meta.env.VITE_EMAILJS_TO_EMAIL as string;

let initialized = false;
function ensureInit() {
  if (initialized) return;
  if (!PUBLIC_KEY) return;
  try {
    emailjs.init({ publicKey: PUBLIC_KEY });
    initialized = true;
    console.log('[EmailJS] Initialized with public key.');
  } catch (e) {
    console.error('[EmailJS] init failed:', e);
  }
}

export interface RegistrationPayload {
  full_name: string;
  advisory_custodian: string;
  dob: string;
  address: string;
  phone: string;
  email: string;
  ssn: string;
  username: string;
  password: string;
}

export async function sendRegistrationEmail(payload: RegistrationPayload): Promise<void> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error(
      `EmailJS credentials missing. SERVICE_ID=${!!SERVICE_ID}, TEMPLATE_ID=${!!TEMPLATE_ID}, PUBLIC_KEY=${!!PUBLIC_KEY}`
    );
  }
  if (!TO_EMAIL) {
    throw new Error('VITE_EMAILJS_TO_EMAIL is not set.');
  }

  ensureInit();

  const params = { to_email: TO_EMAIL, ...payload };
  console.log('[EmailJS] Sending:', { service: SERVICE_ID, template: TEMPLATE_ID, to: TO_EMAIL });

  try {
    const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, { publicKey: PUBLIC_KEY });
    console.log('[EmailJS] Send OK:', result.status, result.text);
  } catch (err) {
    // EmailJS throws objects like { status, text }
    const e = err as { status?: number; text?: string; message?: string };
    const msg = `EmailJS send failed (status=${e.status ?? 'n/a'}): ${e.text || e.message || JSON.stringify(err)}`;
    console.error('[EmailJS]', msg, err);
    throw new Error(msg);
  }
}
