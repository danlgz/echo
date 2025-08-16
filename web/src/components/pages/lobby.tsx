import { PlusIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useCreateRoom, useDeleteRoom, useGetRooms } from '@/hooks/http';
import RoomCard from '../domain/room-card';
import {
  RoomDialogForm,
  type RoomFormPayloadType,
} from '../domain/room-dialog-form';
import { Button } from '../ui/button';
import LoadingPage from './loading';

export default function LobbyPage() {
  const { data, isLoading } = useGetRooms();
  const { mutateAsync: createRoom } = useCreateRoom();
  const { mutateAsync: deleteRoom } = useDeleteRoom();

  async function handleCreateRoom(payload: RoomFormPayloadType) {
    toast.promise(createRoom(payload), {
      loading: 'Creating room...',
      success: 'Room created successfully',
      error: 'Failed to create room',
    });
  }

  async function handleDeleteRoom(id: number) {
    toast.promise(deleteRoom(id), {
      loading: 'Deleting room...',
      success: 'Room deleted successfully',
      error: 'Failed to delete room',
    });
  }

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <div className="flex justify-between">
        <h2>Lobby</h2>
        <RoomDialogForm
          onSubmit={handleCreateRoom}
          trigger={<Button startIcon={<PlusIcon />}>Room</Button>}
        />
      </div>

      <div className="flex flex-col gap-4 mt-6">
        {data?.map((room) => (
          <RoomCard
            key={room.id}
            id={room.id}
            name={room.name}
            onDelete={handleDeleteRoom}
          />
        ))}
      </div>
    </>
  );
}
