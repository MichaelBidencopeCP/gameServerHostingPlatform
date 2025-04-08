import { useState } from "react";
import TextInput from "./textInput";


export default function HiddenInput({
    placeholder = "",
    label = "",
    value = "",
    onChange = () => {},
    required,
    className,
    }: Readonly<{
    placeholder?: string;
    label?: string;
    value?: string;
    onChange?: (value: string) => void;
    required?: boolean;
    className?: string;
    }>) {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const endDecorator = (
        <button 
            type="button" 
            onClick={togglePasswordVisibility}
            className="ml-2 mr-2"
        >
            {passwordVisible ? "Hide" : "Show"}
        </button>
    );

    return(
        <div className={className}>
            <TextInput
                label={label}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                type={passwordVisible ? "text" : "password"}
                endDecorator={endDecorator}
            />
            
        </div>
    );
}

