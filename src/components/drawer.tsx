import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import type { ReactNode } from 'react';

type DrawerProps = {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  triggerElement?: ReactNode;
};

export const Drawer = ({
  children,
  open,
  onOpenChange,
  triggerElement
}: DrawerProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {triggerElement !== null && (
        <SheetTrigger asChild>
          {triggerElement || <Button variant="outline">Edit</Button>}
        </SheetTrigger>
      )}
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit presentation details</SheetTitle>
          <SheetDescription>
            Make changes to the details here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
};
