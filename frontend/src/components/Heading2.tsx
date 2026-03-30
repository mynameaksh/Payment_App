
interface Heading2Prop {
    label: string
    type: "related" | "open"
}

const defaultStyles = "text-md ";


export function Heading2({ label, type }: Heading2Prop) {
    return <div className={`${defaultStyles} ${type === "related" ? "text-black font-bold" : "text-gray-400"}`}>
        {label}
    </div >
}