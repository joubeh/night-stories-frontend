export default function PageLoading() {
  return (
    <div className="p-2 md:max-w-xl md:mx-auto">
      <div className="shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse">
          <div className="rounded-lg bg-slate-700 h-[10rem] w-[10rem] mb-3 mx-auto"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-700 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                <div className="h-2 bg-slate-700 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                <div className="h-2 bg-slate-700 rounded col-span-2"></div>
              </div>
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="h-2 bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
