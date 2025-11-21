import type { Presenter } from '@/types';

export const mockPresenters: Presenter[] = [
  {
    id: '1',
    name: 'John Doe',
    company: 'Acme Inc',
    email: 'john@acme.com',
    topic: 'React Testing',
    date: '2025-01-01',
    duration: 60,
    status: 'pending'
  },
  {
    id: '2',
    name: 'Jane Smith',
    company: 'Tech Corp',
    email: 'jane@tech.com',
    topic: 'Cypress Testing',
    date: '2025-02-01',
    duration: 45,
    status: 'approved'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    company: 'Dev Co',
    email: 'bob@dev.com',
    topic: 'TypeScript',
    date: '2025-03-01',
    duration: 30,
    status: 'completed'
  }
]; 