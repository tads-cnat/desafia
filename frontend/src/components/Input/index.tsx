import {
    forwardRef,
    HTMLInputTypeAttribute,
    InputHTMLAttributes,
    useId,
    useState,
} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    type?: HTMLInputTypeAttribute;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { label, placeholder, type = "text", ...rest } = props;
    const id = useId();

    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <div className="label">
                <label htmlFor={id} className="label-text">
                    {label}
                </label>
            </div>
            <label className="input input-bordered flex items-center gap-2 mb-3">
                <input
                    {...rest}
                    type={type === "password" && showPassword ? "text" : type}
                    placeholder={placeholder}
                    className="grow"
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
        </>
    );
});

Input.displayName = "Input";

export default Input;
