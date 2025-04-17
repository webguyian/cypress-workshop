import { useMemo } from 'react';
import { StatCard } from '@/components/stat-card';
import type { Presenter } from '@/types';

interface StatCardsProps {
  data: Presenter[];
}

export function StatCards({ data }: StatCardsProps) {
  const stats = useMemo(() => {
    const totalPresenters = data.length;
    const approvedPresenters = data.filter(
      (p) => p.status === 'approved'
    ).length;
    const duration = Math.round(
      data.reduce((acc, p) => acc + p.duration, 0) / totalPresenters
    );
    const avgDuration = isNaN(duration) ? 0 : duration;
    return { totalPresenters, approvedPresenters, avgDuration };
  }, [data]);

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8">
      <StatCard
        title="Total Presenters"
        value={stats.totalPresenters}
        description="registered in the system"
        color="purple"
      />
      <StatCard
        title="Approved Presenters"
        value={stats.approvedPresenters}
        description="ready to present"
        color="green"
      />
      <StatCard
        title="Average Duration"
        value={`${stats.avgDuration} min`}
        description="per presentation"
        color="blue"
        className="sm:col-span-2 lg:col-span-1"
      />
    </div>
  );
}
