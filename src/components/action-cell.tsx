import { Row, Table } from '@tanstack/react-table';
import { MoreVertical, PencilIcon, CheckIcon, XIcon } from 'lucide-react';
import { Drawer } from '@/components/drawer';
import { DetailsForm } from '@/components/details-form';
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
    <Drawer
      open={drawerOpen}
      onOpenChange={setDrawerOpen}
      triggerElement={
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
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
      }
    >
      <DetailsForm data={data} onSubmit={submit} />
    </Drawer>
  );
};
