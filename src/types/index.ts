import type { RowData } from '@tanstack/react-table';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateRow: (presenterData: PresenterData) => void;
  }
}

export type Status =
  | 'pending'
  | 'review'
  | 'approved'
  | 'rejected'
  | 'completed';

export type Presenter = {
  id: string;
  name: string;
  company: string;
  email: string;
  topic: string;
  date: string;
  duration: number;
  status: Status;
};

export type Presenters = Presenter[];

export type PresenterData = Partial<Presenter>;
