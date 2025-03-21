export type Status =
  | 'pending'
  | 'review'
  | 'approved'
  | 'rejected'
  | 'completed';

export type User = {
  name: string;
  company: string;
  email: string;
  topic: string;
  date: string;
  duration: number;
  status: Status;
};

export type Users = User[];
