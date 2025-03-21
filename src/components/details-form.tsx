import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DatePicker } from './date-picker';
import { DataSelect } from './data-select';

export const DetailsForm = () => {
  return (
    <div className="grid gap-4 p-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Topic
        </Label>
        <Input
          id="topic"
          value="Synergized fresh-thinking middleware"
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Presenter
        </Label>
        <Input id="name" value="Serene Barus" className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="email" className="text-right">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value="sbarus0@mynte.com"
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="company" className="text-right">
          Company
        </Label>
        <Input id="company" value="Mynte" className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="duration" className="text-right">
          Duration (min.)
        </Label>
        <Input id="duration" type="number" value="80" className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="date" className="text-right">
          Date
        </Label>
        <DatePicker
          id="date"
          className="col-span-3"
          initialDate={new Date('2025-12-14T00:00:00')}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="status" className="text-right">
          Status
        </Label>
        <DataSelect
          id="status"
          className="col-span-3"
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
          value="review"
        />
      </div>
    </div>
  );
};
