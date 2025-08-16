import { yupResolver } from '@hookform/resolvers/yup';
import { DialogClose } from 'node_modules/@radix-ui/react-dialog/dist';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const schema = yup.object({
  name: yup.string().required('Name is required'),
});

export type RoomFormPayloadType = yup.InferType<typeof schema>;

type RoomDialogFormProps = {
  trigger: React.ReactNode;
  onSubmit: (data: RoomFormPayloadType) => void;
  type?: 'create' | 'edit';
};

export function RoomDialogForm({
  trigger,
  onSubmit,
  type = 'create',
}: RoomDialogFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmitHandler(data: RoomFormPayloadType) {
    onSubmit(data);
    setIsOpen(false);
    reset();
  }

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <DialogHeader>
            <DialogTitle>
              {type === 'create' ? 'Create a new room' : 'Edit room'}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register('name')} />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={!isValid}>
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
