import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowLeftIcon } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Button } from '../ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '../ui/input-otp';
import { Label } from '../ui/label';

type Props = {
  requestedEmail: string;
  onSubmit: (data: { code: string }) => void;
  onBack: () => void;
  onReSend: () => void;
};

const schema = yup.object({
  code: yup.string().required().min(6).max(6),
});

export default function VerifyOTPForm({
  requestedEmail,
  onSubmit,
  onBack,
  onReSend,
}: Props) {
  const {
    handleSubmit,
    formState: { isValid },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data: yup.InferType<typeof schema>) => {
    onSubmit(data);
  };

  return (
    <form
      className="flex flex-col gap-4 max-w-sm"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <div>
        <Button
          startIcon={<ArrowLeftIcon />}
          onClick={onBack}
          variant="link"
          className="p-0 mb-2"
        >
          Back
        </Button>
        <h2>Enter verification code</h2>
        <p className="text-gray-500">
          We sent a 6-digit code to <b>{requestedEmail}</b>
        </p>
      </div>

      <div className="flex flex-col gap-2 justify-center">
        <Label htmlFor="code">Code</Label>
        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <InputOTP
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              maxLength={6}
              autoFocus
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          )}
        />
      </div>

      <div className="flex gap-1">
        <Button type="submit" disabled={!isValid}>
          Verify
        </Button>
        <Button onClick={onReSend} variant="outline">
          Resend code
        </Button>
      </div>
    </form>
  );
}
