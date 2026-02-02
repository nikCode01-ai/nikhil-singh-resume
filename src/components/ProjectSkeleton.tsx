export function ProjectSkeleton() {
  return (
    <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden dark:bg-slate-900/60 dark:ring-1 dark:ring-white/10">
      {/* Image Skeleton */}
      <div className="relative h-48 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 animate-pulse" />
      
      {/* Content Skeleton */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="h-6 w-24 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
          <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        </div>
        
        <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded mb-2 animate-pulse" />
        <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded mb-1 animate-pulse" />
        <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-700 rounded mb-4 animate-pulse" />
        
        {/* Tech Stack Skeleton */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
          ))}
        </div>
        
        {/* Tags Skeleton */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-5 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          ))}
        </div>
        
        {/* Action Link Skeleton */}
        <div className="h-5 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
      </div>
    </div>
  );
}

export function ProjectGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(count)].map((_, index) => (
        <ProjectSkeleton key={index} />
      ))}
    </div>
  );
}
