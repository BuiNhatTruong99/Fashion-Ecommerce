import { useMemo } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

export interface IInputProps {
  register: UseFormRegister<any>;
  label: string;
  name: string;
  type: string;
  errorField?: FieldError;
}

const InputForm: React.FC<IInputProps> = ({ register, label, type, name, errorField }) => {
  const isErrorField = useMemo(() => errorField?.message && errorField?.message.length > 0, [errorField]);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-gray-700">{label}</label>
      <input
        {...register(name)}
        type={type}
        name={name}
        placeholder={label}
        className={`ring-2 ring-gray-300 rounded-md p-4 outline-none ${isErrorField ? 'ring-bg-primary' : ''}`}
      />
      {isErrorField && <div className="text-sm text-red-600 bg-white">{errorField?.message}</div>}
    </div>
  );
};

export default InputForm;
