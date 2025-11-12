import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  className?: string;
  color?: 'blue' | 'green' | 'purple' | 'default';
}

export function StatCard({
  title,
  value,
  description,
  className,
  color = 'default'
}: StatCardProps) {
  const cardId = title.toLowerCase().replace(/\s+/g, '-');
  const colorStyles = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    purple: 'bg-purple-100 text-purple-800',
    default: ''
  }[color];

  return (
    <Card
      className={`${colorStyles} ${className || ''}`}
      aria-labelledby={cardId}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 sm:p-6">
        <CardTitle id={cardId} className="text-sm font-bold line-clamp-2">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
        <div className="flex flex-row sm:flex-col items-baseline gap-2 sm:gap-1">
          <div className="text-3xl sm:text-5xl font-thin">{value}</div>
          <p className="hidden sm:block text-xs sm:text-sm opacity-90">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
