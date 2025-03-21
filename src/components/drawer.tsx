import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { DetailsForm } from './details-form';

export const Drawer = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="my-4" variant="outline">
          Open drawer
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit presentation details</SheetTitle>
          <SheetDescription>
            Make changes to the details here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <DetailsForm />
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
