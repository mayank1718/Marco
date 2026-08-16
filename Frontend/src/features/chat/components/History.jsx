import React from "react";

const History = ({ chat, handleOpenMessage }) => {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Recent searches</h3>
        <button className="text-xs text-violet-300">Clear</button>
      </div>
      <div className="space-y-2">
        {Object.values(chat).map((title) => {
          return (
            <button
              key={title._id}
              onClick={() => handleOpenMessage(title._id)}
              className="flex w-full items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2.5 text-left transition hover:border-slate-600">
              <span className="pr-4 text-sm text-slate-200">{title.title}</span>
              <span className="text-lg text-slate-500">→</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default History;
