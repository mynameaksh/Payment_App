

interface ButtonProps {
    label: string,
    variant: "primary" | "secondary" | "tertiary" | "primary2",
    onClick?: () => void
}

const buttonVariants = {
    "primary": "bg-violet-500 text-white w-sm",
    "primary2": "bg-violet-500 text-white w-35",
    "secondary": "w-25 text-violet-400 bg-blue-100",
    "tertiary": "w-35 text-black bg-blue-100"
}

const defaultStyles = "font-bold text-sm p-2 rounded-md mt-2 cursor-pointer"

function Button({ label, variant, onClick }: ButtonProps) {
    return (
        <button onClick={onClick} className={`${defaultStyles} ${buttonVariants[variant]}`}>{label}</button>

    )
}

export default Button