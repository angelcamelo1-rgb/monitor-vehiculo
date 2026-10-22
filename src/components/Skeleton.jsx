export default function Skeleton() {
    return (
      <div className="animate-pulse bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl w-full">
        {/* Cabecera del Skeleton */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
          <div className="space-y-2">
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-20"></div>
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-44"></div>
          </div>
          <div className="h-7 bg-slate-200 dark:bg-slate-800 rounded-full w-20"></div>
        </div>
        {/* Filas del Skeleton */}
        <div className="space-y-4">
          <div className="h-14 bg-slate-100 dark:bg-slate-800/50 rounded-xl"></div>
          <div className="h-14 bg-slate-100 dark:bg-slate-800/50 rounded-xl"></div>
          <div className="h-14 bg-slate-100 dark:bg-slate-800/50 rounded-xl"></div>
        </div>
      </div>
    );
  }