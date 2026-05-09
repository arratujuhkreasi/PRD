'use client';

interface LabeledInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
}

export default function LabeledInput({ label, placeholder, value, onChange, required, type = 'text' }: LabeledInputProps) {
  return (
    <div className="group">
      <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-400 bg-gray-50/50 focus:bg-white focus:shadow-lg focus:shadow-blue-500/10"
      />
    </div>
  );
}
