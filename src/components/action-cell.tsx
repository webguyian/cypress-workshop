import { Row, Table } from '@tanstack/react-table';
import { MoreVertical, PencilIcon, CheckIcon, XIcon } from 'lucide-react';
import { DetailsForm, Drawer } from '@/components';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import type { Presenter } from '@/types';
import useRowActions from '@/hooks/use-row-actions';

export interface ActionCellProps {
  row: Row<Presenter>;
  table: Table<Presenter>;
}

export const ActionCell = ({ row, table }: ActionCellProps) => {
  const {
    actions,
    data,
    drawerOpen,
    dropdownOpen,
    setDrawerOpen,
    setDropdownOpen
  } = useRowActions({ row, table });
  const { approve, edit, reject, submit } = actions;

  return (
    <>
      <DropdownMenu
        open={dropdownOpen}
        onOpenChange={setDropdownOpen}
        modal={false}
      >
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Actions">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={edit}>
            <PencilIcon className="h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={approve}>
            <CheckIcon className="h-4 w-4" />
            Approve
          </DropdownMenuItem>
          <DropdownMenuItem onClick={reject} variant="destructive">
            <XIcon className="h-4 w-4" />
            Reject
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Drawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        triggerElement={null}
      >
        <DetailsForm data={data} onSubmit={submit} />
      </Drawer>
    </>
  );
};
