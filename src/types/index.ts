export type Status =
  | 'pending'
  | 'review'
  | 'approved'
  | 'rejected'
  | 'completed';

export type Presenter = {
  name: string;
  company: string;
  email: string;
  topic: string;
  date: string;
  duration: number;
  status: Status;
};

export type Presenters = Presenter[];
