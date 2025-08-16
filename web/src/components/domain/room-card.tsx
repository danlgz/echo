import { EllipsisVerticalIcon } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import RoomActionsMenu from './room-actions-menu';

type Props = {
  id: number;
  name: string;
  onDelete: (id: number) => void;
};

export default function RoomCard({ id, name, onDelete }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>Last joined: yesterday</CardDescription>
        <CardAction className="self-center flex items-center">
          <Button variant="ghost">Join</Button>
          <RoomActionsMenu
            trigger={
              <Button variant="ghost" size="icon">
                <EllipsisVerticalIcon size={8} />
              </Button>
            }
            onDelete={() => onDelete(id)}
          />
        </CardAction>
      </CardHeader>
    </Card>
  );
}
