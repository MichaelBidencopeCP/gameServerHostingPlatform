import React from "react";


export default function TextInput({ label, value, onChange, required, placeholder, className, id, type, endDecorator, startDecorator, step, disabled }: Readonly<{
    label: string;
    value: string | number;
    onChange: (value:any) => void;
    required?: boolean;
    placeholder?: string;
    className?: string;
    id?: string;
    type?: string;
    endDecorator?: React.ReactNode;
    startDecorator?: React.ReactNode;
    step?: number;
    disabled?: boolean;
}>) {
    const disable = disabled
    return (
        <div className="relative">
            {label && <label className="block mt-2">{label}</label>}
            {startDecorator && (
                <div className="absolute left-0 flex items-center">
                    {startDecorator}
                </div>
            )}
            <div className="relative flex items-center">
                <input
                    disabled={disable}
                    type={type}
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    required={required}
                    placeholder={placeholder}
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
                    step={step}

                />
                {endDecorator && (
                    <div className="absolute right-0 inset-y-0 flex items-center">
                        {endDecorator}
                    </div>
                )}
            </div>
        </div>
    );
}