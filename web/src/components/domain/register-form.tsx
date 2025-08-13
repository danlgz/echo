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
  username: yup.string().min(2).required(),
});

export default function RegisterForm({ onSubmit }: Props) {
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
        <h2>Register</h2>
        <p className="text-gray-500">
          Enter your email and username to register and receive a verification
          code
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

      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          placeholder="Username"
          required
          {...register('username')}
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
