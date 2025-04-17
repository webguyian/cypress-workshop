import { ActionCellProps } from '@/components';
import { formatPresenterData } from '@/lib/utils';
import { useState } from 'react';
import { toast } from 'sonner';

const useRowActions = ({ row, table }: ActionCellProps) => {
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

  const handleApprove = () => {
    setDropdownOpen(false);
    updatePresenter?.({ id: presenter.id, status: 'approved' });
    toast.success('Presentation approved', {
      description: `${presenter.name}'s presentation has been approved`
    });
  };

  const handleReject = () => {
    setDropdownOpen(false);
    updatePresenter?.({ id: presenter.id, status: 'rejected' });
    toast.error('Presentation rejected', {
      description: `${presenter.name}'s presentation has been rejected`
    });
  };

  const actions = {
    submit: handleSubmit,
    edit: handleEdit,
    approve: handleApprove,
    reject: handleReject
  };

  return {
    actions,
    data: presenter,
    drawerOpen,
    dropdownOpen,
    setDrawerOpen,
    setDropdownOpen
  };
};

export default useRowActions;
