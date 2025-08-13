import { useState } from 'react';
import RegisterForm from '../domain/register-form';
import VerifyOTPForm from '../domain/verify-otp-form';

export default function RegisterPage() {
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
    email: <RegisterForm onSubmit={handleEmailSubmit} />,
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
