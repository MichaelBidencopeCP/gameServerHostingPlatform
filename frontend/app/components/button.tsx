

export default function Button({
    children,
    onClick,
    className,
    type = "button",
    disabled,
    }: Readonly<{
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    }>) {
    return (
        <button
        onClick={onClick}
        type={type}
        className={`px-4 py-2 bg-three  hover:bg-three-hover disabled:bg-gray-600 text-white rounded ${className}`}
        disabled={disabled}
        >
        {children}
        </button>
    );
}