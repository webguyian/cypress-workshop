import { useState } from 'react';
import { Row, Table } from '@tanstack/react-table';
import { MoreVertical } from 'lucide-react';
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
import { formatPresenterData } from '@/lib/utils';
import { toast } from 'sonner';

interface ActionCellProps {
  row: Row<Presenter>;
  table: Table<Presenter>;
}

export const ActionCell = ({ row, table }: ActionCellProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const presenter = row.original;
  const updatePresenter = table.options.meta?.updateRow;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = formatPresenterData(Object.fromEntries(formData.entries()));

    if (data) {
      updatePresenter?.(data);
      setDrawerOpen(false);
      toast.success('Presentation details updated successfully', {
        description: `Updated ${data.name}'s presentation`
      });
    } else {
      toast.error('Failed to update presentation details', {
        description: 'Please try again or contact support'
      });
    }
  };

  const handleEdit = () => {
    setDropdownOpen(false);
    setDrawerOpen(true);
  };

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
            <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      }
    >
      <DetailsForm data={presenter} onSubmit={handleSubmit} />
    </Drawer>
  );
};
