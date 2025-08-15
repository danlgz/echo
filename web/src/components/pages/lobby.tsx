import { PlusIcon } from 'lucide-react';
import { useCreateRoom, useGetRooms } from '@/hooks/http';
import {
  CreateRoomDialog,
  type CreateRoomPayloadType,
} from '../domain/create-room-dialog';
import RoomCard from '../domain/room-card';
import { Button } from '../ui/button';
import LoadingPage from './loading';

export default function LobbyPage() {
  const { data, isLoading } = useGetRooms();
  const { mutateAsync: createRoom } = useCreateRoom();

  async function handleCreateRoom(payload: CreateRoomPayloadType) {
    await createRoom(payload);
  }

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <div className="flex justify-between">
        <h2>Lobby</h2>
        <CreateRoomDialog
          onSubmit={handleCreateRoom}
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
