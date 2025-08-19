import * as React from 'react';
import { IMaskInput } from 'react-imask';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  mask?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, mask, icon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
        <div className="relative">
          {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>}
          {mask ? (
            <IMaskInput
              mask={mask}
              maskChar={null}
              placeholderChar=""
              unmask={true}
              showMask={false}
              lazy={true}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${icon ? 'pl-10' : ''} ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'} ${className}`}
              inputRef={ref as React.Ref<HTMLInputElement>}
              {...props}
            />
          ) : (
            <input
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${icon ? 'pl-10' : ''} ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'} ${className}`}
              ref={ref}
              {...props}
            />
          )}
        </div>
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };