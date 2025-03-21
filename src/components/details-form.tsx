import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DatePicker } from './date-picker';
import { DataSelect } from './data-select';
import type { Presenter } from '@/types';

type DetailsFormData = {
  data: Presenter;
};

export const DetailsForm = ({ data }: DetailsFormData) => {
  return (
    <form method="post" className="grid gap-4 p-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name">Topic</Label>
        <Input id="topic" defaultValue={data.topic} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name">Presenter</Label>
        <Input id="name" defaultValue={data.name} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          defaultValue={data.email}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          defaultValue={data.company}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="duration">Duration (min.)</Label>
        <Input
          id="duration"
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
    </form>
  );
};
