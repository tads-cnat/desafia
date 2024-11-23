import {
    forwardRef,
    HTMLInputTypeAttribute,
    InputHTMLAttributes,
    useId,
    useState,
} from "react";
import { useController, Control, FieldValues } from "react-hook-form";
import { Color } from "../types/interface/color";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    type?: HTMLInputTypeAttribute;
    color?: Color;
    control: Control<FieldValues>;
    name: string;
    defaultValue?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { label, placeholder, type = "text", control, name, ...rest } = props;
    const id = useId();

    const [showPassword, setShowPassword] = useState(false);

    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
        defaultValue: "",
    });

    return (
        <>
            {label && (
                <div className="label">
                    <label htmlFor={id} className="label-text">
                        {label}
                    </label>
                </div>
            )}
            <label
                className={
                    "input input-bordered flex items-center gap-2 " +
                    (error ? ` input-accent` : "")
                }
            >
                <input
                    {...rest}
                    {...field}
                    type={type === "password" && showPassword ? "text" : type}
                    placeholder={placeholder}
                    className={"grow"}
                    id={id}
                    ref={ref}
                />
                {type === "password" && (
                    <span
                        className="w-6 h-6 inline-flex justify-center items-center cursor-pointer"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        <i
                            className={`fa-solid fa-${showPassword ? "eye" : "eye-slash"}`}
                        />
                    </span>
                )}
            </label>
            {error && (
                <p className="text-red-500 text-sm mt-1">{error.message}</p>
            )}
        </>
    );
});

Input.displayName = "Input";

export default Input;
