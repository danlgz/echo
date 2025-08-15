import { PlusIcon } from 'lucide-react';
import { useGetRooms } from '@/hooks/http';
import { CreateRoomDialog } from '../domain/create-room-dialog';
import RoomCard from '../domain/room-card';
import { Button } from '../ui/button';
import LoadingPage from './loading';

export default function LobbyPage() {
  const { data, isLoading } = useGetRooms();

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <div className="flex justify-between">
        <h2>Lobby</h2>
        <CreateRoomDialog
          trigger={<Button startIcon={<PlusIcon />}>Room</Button>}
        />
      </div>

      <div className="flex flex-col gap-4 mt-6">
        {data?.map((room) => (
          <RoomCard key={room.id} id={room.id} name={room.name} />
        ))}
      </div>
    </>
  );
}
