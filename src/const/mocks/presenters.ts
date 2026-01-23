import type { Presenter } from '@/types';
// We have mock presenters in several files, should we consolidate?
export const mockPresenters: Presenter[] = [
  {
    id: '1',
    name: 'John Doe',
    company: 'Acme Inc',
    email: 'john@acme.com',
    topic: 'React Testing',
    date: '2026-01-01',
    duration: 60,
    status: 'review'
  },
  {
    id: '2',
    name: 'Jane Smith',
    company: 'Tech Corp',
    email: 'jane@tech.com',
    topic: 'Cypress Testing',
    date: '2026-02-01',
    duration: 30,
    status: 'approved'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    company: 'Dev Co',
    email: 'bob@dev.com',
    topic: 'TypeScript',
    date: '2026-03-01',
    duration: 90,
    status: 'approved'
  }
];
