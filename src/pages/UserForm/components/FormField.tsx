import { FieldError, Path, RegisterOptions, UseFormRegister } from "react-hook-form";

type FormFieldProps<T extends Record<string, any>> = {
  label: string;
  name: keyof T;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  rules?: RegisterOptions<T, Path<T>>;
  error?: FieldError;
};

export function FormField<T extends Record<string, any>>({
  label,
  name,
  type = "text",
  placeholder,
  register,
  rules,
  error,
}: FormFieldProps<T>) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm text-gray-600 font-bold">{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        {...register(name as Path<T>, rules)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />

      {error && (
        <span className="text-xs text-red-500">{error.message}</span>
      )}
    </div>
  );
}