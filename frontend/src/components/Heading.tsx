
interface HeadingProp {
    label: number | null | string
}

export function Heading({ label }: HeadingProp) {
    return <div className="font-bold text-4xl">
        {label}
    </div>
}