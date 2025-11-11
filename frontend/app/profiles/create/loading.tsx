export default function Loading() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-600 to-blue-800">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="h-6 w-32 bg-white/20 rounded animate-pulse mb-4"></div>
          <div className="h-8 bg-white/20 rounded w-64 mb-2 animate-pulse"></div>
          <div className="h-5 bg-white/20 rounded w-96 animate-pulse"></div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 p-8">
          <div className="space-y-6">
            <div>
              <div className="h-4 bg-white/20 rounded w-32 mb-2 animate-pulse"></div>
              <div className="h-10 bg-white/20 rounded w-full animate-pulse"></div>
            </div>
            <div>
              <div className="h-4 bg-white/20 rounded w-24 mb-2 animate-pulse"></div>
              <div className="h-10 bg-white/20 rounded w-full animate-pulse"></div>
            </div>
            <div>
              <div className="h-4 bg-white/20 rounded w-20 mb-2 animate-pulse"></div>
              <div className="h-24 bg-white/20 rounded w-full animate-pulse"></div>
            </div>
            <div className="h-12 bg-white/20 rounded w-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
