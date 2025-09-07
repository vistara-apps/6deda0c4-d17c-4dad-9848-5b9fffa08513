export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-pulse space-y-4 max-w-lg w-full mx-4">
        <div className="h-8 bg-surface rounded w-1/4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-surface rounded"></div>
          <div className="h-4 bg-surface rounded w-5/6"></div>
          <div className="h-4 bg-surface rounded w-3/4"></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-20 bg-surface rounded"></div>
          <div className="h-20 bg-surface rounded"></div>
        </div>
      </div>
    </div>
  );
}
