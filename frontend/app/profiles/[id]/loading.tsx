export default function Loading() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-600 to-blue-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="h-6 w-32 bg-white/20 rounded animate-pulse mb-4"></div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 overflow-hidden">
          <div className="bg-white/5 px-8 py-12">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-white/20 animate-pulse"></div>
              <div className="flex-1">
                <div className="h-8 bg-white/20 rounded w-48 mb-2 animate-pulse"></div>
                <div className="h-5 bg-white/20 rounded w-64 animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="px-8 py-6">
            <div className="space-y-6">
              <div>
                <div className="h-4 bg-white/20 rounded w-24 mb-2 animate-pulse"></div>
                <div className="h-5 bg-white/20 rounded w-full animate-pulse"></div>
                <div className="h-5 bg-white/20 rounded w-3/4 mt-2 animate-pulse"></div>
              </div>

              <div className="border-t border-white/20 pt-6">
                <div className="h-4 bg-white/20 rounded w-32 mb-3 animate-pulse"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="h-4 bg-white/20 rounded w-24 mb-1 animate-pulse"></div>
                    <div className="h-5 bg-white/20 rounded w-12 animate-pulse"></div>
                  </div>
                  <div>
                    <div className="h-4 bg-white/20 rounded w-32 mb-1 animate-pulse"></div>
                    <div className="h-5 bg-white/20 rounded w-40 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm px-8 py-4 flex gap-3">
            <div className="flex-1 h-12 bg-white/20 rounded-lg animate-pulse"></div>
            <div className="h-12 w-24 bg-white/20 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
