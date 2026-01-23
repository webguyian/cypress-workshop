import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { DatePicker } from './date-picker';
import { DataSelect } from './data-select';
import type { Presenter } from '@/types';
import { SheetClose, SheetFooter } from './ui/sheet';
import { useFormValidation } from '@/hooks/use-form-validation';

type DetailsFormData = {
  data: Presenter;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const DetailsForm = ({ data, onSubmit }: DetailsFormData) => {
  const { errors, handleBlur, hasErrors } = useFormValidation();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(event);
  };

  return (
    <form
      aria-label="Edit presentation details"
      method="post"
      onSubmit={handleSubmit}
    >
      <input name="id" type="hidden" value={data.id} />
      <div className="grid gap-4 p-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="topic">Topic</Label>
          <div className="col-span-3">
            <Input
              id="topic"
              name="topic"
              defaultValue={data.topic}
              className="w-full"
              onBlur={handleBlur}
              aria-invalid={errors.topic ? 'true' : 'false'}
            />
            {errors.topic && (
              <p role="alert" className="text-sm text-red-500 mt-1">
                {errors.topic}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name">Presenter</Label>
          <div className="col-span-3">
            <Input
              id="name"
              name="name"
              defaultValue={data.name}
              className="w-full"
              onBlur={handleBlur}
              aria-invalid={errors.name ? 'true' : 'false'}
            />
            {errors.name && (
              <p role="alert" className="text-sm text-red-500 mt-1">
                {errors.name}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email">Email</Label>
          <div className="col-span-3">
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={data.email}
              className="w-full"
              onBlur={handleBlur}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && (
              <p role="alert" className="text-sm text-red-500 mt-1">
                {errors.email}
              </p>
            )}
          </div>
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
          <div className="col-span-3">
            <Input
              id="duration"
              name="duration"
              type="number"
              defaultValue={data.duration}
              className="w-full"
              onBlur={handleBlur}
              aria-invalid={errors.duration ? 'true' : 'false'}
            />
            {errors.duration && (
              <p role="alert" className="text-sm text-red-500 mt-1">
                {errors.duration}
              </p>
            )}
          </div>
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
          <Label id="status-label">Status</Label>
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
            ariaLabelledBy="status-label"
          />
        </div>
      </div>
      <SheetFooter>
        <SheetClose asChild>
          <Button type="submit" disabled={hasErrors}>
            Save changes
          </Button>
        </SheetClose>
      </SheetFooter>
    </form>
  );
};
