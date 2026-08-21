import React from 'react'

const TrendingTopics = ({topics , setMessage}) => {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Trending topics</h3>
        <span className="text-[10px] uppercase tracking-[0.14em] text-slate-400">
          Today
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => (
          <span
            key={topic}
            onClick={()=>setMessage(topic)}
            className="rounded-full cursor-pointer border border-slate-700 bg-slate-950/70 px-2.5 py-1.5 text-xs text-slate-200">
            #{topic}
          </span>
        ))}
      </div>
    </section>
  );
}

export default TrendingTopics
