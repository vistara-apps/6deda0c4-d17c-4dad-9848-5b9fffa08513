'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-md mx-4">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">⚠️</span>
        </div>
        
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          Something went wrong!
        </h2>
        
        <p className="text-text-secondary mb-6">
          We encountered an error while loading CoinButler. Please try again.
        </p>
        
        <button
          onClick={reset}
          className="bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-lg font-medium hover:from-primary/90 hover:to-accent/90 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
