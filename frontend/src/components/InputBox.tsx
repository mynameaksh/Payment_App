import { forwardRef } from "react";

interface InputBoxProp {
    placeholder: string;


}

const InputBox = forwardRef<HTMLInputElement, InputBoxProp>(
    ({ placeholder }, ref) => {
        return (
            <div>
                <input

                    ref={ref}
                    type="text"
                    placeholder={placeholder}
                    className="p-2 w-64 border border-gray-400 rounded-md"
                />
            </div>
        );
    }
);

export default InputBox;