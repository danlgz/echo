import { yupResolver } from '@hookform/resolvers/yup/src/yup.js';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type Props = {
  onSubmit: (data: { email: string }) => void;
};

const schema = yup.object({
  email: yup.string().email().required(),
});

export default function RequestOTPForm({ onSubmit }: Props) {
  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data: yup.InferType<typeof schema>) => {
    console.log(data);
    onSubmit(data);
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <div>
        <h2>Access</h2>
        <p className="text-gray-500">
          Enter your email to receive a verification code
        </p>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          placeholder="Email"
          required
          {...register('email')}
        />
      </div>

      <div>
        <Button type="submit" disabled={!isValid}>
          Send code
        </Button>
      </div>
    </form>
  );
}
