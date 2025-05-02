

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
        className={`px-4 py-2 bg-three  hover:bg-hover bg-accent disabled:bg-background-2 text-white rounded ${className} cursor-pointer disabled:cursor-not-allowed`}
        disabled={disabled}
        >
        {children}
        </button>
    );
}