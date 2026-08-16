import React from "react";

const FormGroup = ({ label, value, type, onChange, placeholder }) => {
  return (
    <div>
      <label htmlFor="email" className="mb-2 capitalize block text-sm text-slate-300">
        {label}
      </label>
      <input
        id={label}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30"
      />
    </div>
  );
};

export default FormGroup;
