import { Button } from '../ui/button';
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

type Props = {
  id: number;
  name: string;
};

export default function RoomCard({ name }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>Last joined: yesterday</CardDescription>
        <CardAction className="self-center">
          <Button variant="ghost">Join</Button>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
