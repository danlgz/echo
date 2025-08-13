import { PlusIcon } from 'lucide-react';
import { CreateRoomDialog } from '../domain/create-room-dialog';
import RoomCard from '../domain/room-card';
import { Button } from '../ui/button';

export default function LobbyPage() {
  return (
    <>
      <div className="flex justify-between">
        <h2>Lobby</h2>
        <CreateRoomDialog
          trigger={<Button startIcon={<PlusIcon />}>Room</Button>}
        />
      </div>

      <div className="flex flex-col gap-4 mt-6">
        <RoomCard />
        <RoomCard />
        <RoomCard />
        <RoomCard />
        <RoomCard />
        <RoomCard />
        <RoomCard />
        <RoomCard />
        <RoomCard />
      </div>
    </>
  );
}
