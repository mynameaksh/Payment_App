
interface HeadingProp {
    label: string
}

export function Heading({ label }: HeadingProp) {
    return <div className="font-bold text-4xl pt-6">
        {label}
    </div>
}