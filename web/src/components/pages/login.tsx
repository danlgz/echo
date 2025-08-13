import { useState } from 'react';
import RequestOTPForm from '../domain/request-otp-form';
import VerifyOTPForm from '../domain/verify-otp-form';
export default function LoginPage() {
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [requestedEmail, setRequestedEmail] = useState('');

  const handleEmailSubmit = ({ email }: { email: string }) => {
    setRequestedEmail(email);
    setStep('code');
  };

  const handleCodeSubmit = () => {
    setStep('email');
  };

  const stepMap = {
    email: <RequestOTPForm onSubmit={handleEmailSubmit} />,
    code: (
      <VerifyOTPForm
        requestedEmail={requestedEmail}
        onSubmit={handleCodeSubmit}
        onBack={handleCodeSubmit}
        onReSend={handleCodeSubmit}
      />
    ),
  };

  return <div className="mx-auto max-w-sm">{stepMap[step]}</div>;
}
