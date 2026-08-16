import React from "react";

const SearchField = ({ handleSubmit, value, onChange }) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3 shadow-[0_0_30px_rgba(0,0,0,0.35)] backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-3">
        <span className="text-lg text-slate-400">⌕</span>
        <input
          value={value}
          onChange={onChange}
          type="text"
          placeholder="Ask anything..."
          className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
        />
        <button className="rounded-lg bg-violet-500 px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-violet-500/20">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchField;
