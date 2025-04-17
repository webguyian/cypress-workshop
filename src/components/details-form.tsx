import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { DatePicker } from './date-picker';
import { DataSelect } from './data-select';
import type { Presenter } from '@/types';
import { SheetClose, SheetFooter } from './ui/sheet';

type DetailsFormData = {
  data: Presenter;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const DetailsForm = ({ data, onSubmit }: DetailsFormData) => {
  return (
    <form method="post" onSubmit={onSubmit}>
      <input name="id" type="hidden" value={data.id} />
      <div className="grid gap-4 p-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="topic">Topic</Label>
          <Input
            id="topic"
            name="topic"
            defaultValue={data.topic}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name">Presenter</Label>
          <Input
            id="name"
            name="name"
            defaultValue={data.name}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={data.email}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            name="company"
            defaultValue={data.company}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="duration">Duration (min.)</Label>
          <Input
            id="duration"
            name="duration"
            type="number"
            defaultValue={data.duration}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="date">Date</Label>
          <DatePicker
            id="date"
            className="col-span-3"
            initialDate={new Date(`${data.date}T00:00:00`)}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="status">Status</Label>
          <DataSelect
            id="status"
            className="col-span-3"
            defaultValue={data.status}
            options={[
              {
                label: 'Pending',
                value: 'pending'
              },
              {
                label: 'Review',
                value: 'review'
              },
              {
                label: 'Approved',
                value: 'approved'
              },
              {
                label: 'Rejected',
                value: 'rejected'
              },
              {
                label: 'Completed',
                value: 'completed'
              }
            ]}
            placeholder="Select status"
          />
        </div>
      </div>
      <SheetFooter>
        <SheetClose asChild>
          <Button type="submit">Save changes</Button>
        </SheetClose>
      </SheetFooter>
    </form>
  );
};
