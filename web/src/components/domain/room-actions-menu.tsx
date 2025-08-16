import { PencilIcon, TextCursorIcon, TrashIcon } from 'lucide-react';
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
          <TextCursorIcon />
          Rename
        </DropdownMenuItem>
        <RoomDeleteConfirmDialog
          trigger={
            <DropdownMenuItem
              variant="destructive"
              onSelect={(e) => {
                e.preventDefault();
                document.body.style.pointerEvents = '';
              }}
            >
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
