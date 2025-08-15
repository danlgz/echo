import { useState } from 'react';
import { useAuth } from '@/context/auth';
import { useRequestOTP, useVerifyOTP } from '@/hooks/http';
import RequestOTPForm from '../domain/request-otp-form';
import VerifyOTPForm from '../domain/verify-otp-form';

export default function LoginPage() {
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [requestedEmail, setRequestedEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { asyncLogin } = useAuth();

  const { mutateAsync: requestOTP } = useRequestOTP();
  const { mutateAsync: verifyOTP } = useVerifyOTP();

  const handleEmailSubmit = async ({ email }: { email: string }) => {
    setError(null);
    setRequestedEmail(email);
    try {
      const result = await requestOTP({ email });
      console.log(result);
      setStep('code');
    } catch (_error) {
      setError('Failed to request OTP');
    }
  };

  const handleCodeSubmit = async ({ code }: { code: string }) => {
    setError(null);
    try {
      const { access_token, refresh_token } = await verifyOTP({
        email: requestedEmail,
        code,
      });
      await asyncLogin({
        accessToken: access_token,
        refreshToken: refresh_token,
      });
    } catch (_error) {
      setError('Failed to verify OTP');
    }
  };

  const handleResendEmail = () => {
    if (!requestedEmail) {
      setError('Email is required');
      return;
    }

    handleEmailSubmit({ email: requestedEmail });
  };

  const stepMap = {
    email: <RequestOTPForm onSubmit={handleEmailSubmit} error={error} />,
    code: (
      <VerifyOTPForm
        requestedEmail={requestedEmail}
        onSubmit={handleCodeSubmit}
        onBack={() => setStep('email')}
        onReSend={handleResendEmail}
      />
    ),
  };

  return <div className="mx-auto max-w-sm">{stepMap[step]}</div>;
}
