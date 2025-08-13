import { Button } from '../ui/button';
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

export default function RoomCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Room Name</CardTitle>
        <CardDescription>Last joined: yesterday</CardDescription>
        <CardAction className="self-center">
          <Button variant="ghost">Join</Button>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
