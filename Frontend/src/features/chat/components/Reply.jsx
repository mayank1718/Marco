import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Reply = ({ latestMessage }) => {
  return (
    <section className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-4">
      <div className=" mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
          Live answer
        </div>
      </div>
      {latestMessage?.role === "ai" && (
        <ReactMarkdown
          components={{
            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
            ul: ({ children }) => (
              <ul className="mb-2 list-disc pl-5">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="mb-2 list-decimal pl-5">{children}</ol>
            ),
            h1: ({ children }) => (
              <h1 className="mb-3 text-2xl font-bold">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="mb-2 text-xl font-bold">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="mb-2 text-lg font-semibold">{children}</h3>
            ),
            strong: ({ children }) => (
              <strong className="font-bold">{children}</strong>
            ),
            code: ({ children }) => (
              <code className="rounded bg-gray-800 px-1 py-0.5">
                {children}
              </code>
            ),
          }}
          remarkPlugins={remarkGfm}>
          {latestMessage?.content}
        </ReactMarkdown>
      )}
    </section>
  );
};

export default Reply;
