import type { PresenterData } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatPresenterData(data: any): PresenterData {
  const formattedData: PresenterData = {
    id: data.id,
    name: data.name,
    company: data.company,
    email: data.email,
    topic: data.topic,
    date: format(new Date(data.date), 'yyyy-MM-dd'),
    duration: Number(data.duration),
    status: data.status
  };

  return formattedData;
}
