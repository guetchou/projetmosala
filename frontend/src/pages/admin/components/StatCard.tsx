interface StatCardProps {
  title: string;
  value: string | number;
  icon?: string;
}

export default function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#00A651] h-full">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm text-gray-600 mb-1 truncate">{title}</p>
          <p className="text-2xl md:text-3xl font-bold text-gray-900">{value}</p>
        </div>
        {icon && (
          <div className="text-3xl text-[#00A651] flex-shrink-0">{icon}</div>
        )}
      </div>
    </div>
  );
}
