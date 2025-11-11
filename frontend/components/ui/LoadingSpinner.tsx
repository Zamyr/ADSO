export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4',
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} border-white border-t-transparent rounded-full animate-spin`}
      />
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 animate-pulse h-full">
      <div className="space-y-3">
        <div className="h-6 bg-white/20 rounded w-1/3"></div>
        <div className="h-4 bg-white/20 rounded w-1/2"></div>
        <div className="h-4 bg-white/20 rounded w-full"></div>
        <div className="h-4 bg-white/20 rounded w-2/3"></div>
      </div>
    </div>
  );
}
