import { PencilIcon, TrashIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import RoomDeleteConfirmDialog from './room-delete-confirm-dialog';

type Props = {
  trigger: React.ReactNode;
  onDelete: () => void;
};

export default function RoomActionsMenu({ trigger, onDelete }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <PencilIcon />
          Edit
        </DropdownMenuItem>
        <RoomDeleteConfirmDialog
          trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <TrashIcon />
              Delete
            </DropdownMenuItem>
          }
          onConfirm={onDelete}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
