import Action from "../types/interface/action";
import { AlertIcon, ErrorIcon, SuccessIcon, WarningIcon } from "./Icons";

interface AlertProps {
    type?: "info" | "success" | "warning" | "error" | "default";
    primary?: Action;
    secondary?: Action;
    message: string;
}

function Alert(props: AlertProps): JSX.Element {
    const { type = "default", primary, secondary, message } = props;

    if (message.length === 0) {
        return <></>;
    }

    const icon = getIcon(type);

    function getIcon(type: string) {
        switch (type) {
            case "info":
                return <AlertIcon />;
            case "success":
                return <SuccessIcon />;
            case "warning":
                return <WarningIcon />;
            case "error":
                return <ErrorIcon />;
            default:
                return <AlertIcon />;
        }
    }

    return (
        <div role="alert" className={`alert alert-${type}`}>
            {icon}
            <span>{message}</span>
            <div>
                {secondary && (
                    <button className="btn btn-sm">{secondary.label}</button>
                )}
                {primary && (
                    <button className="btn btn-sm btn-primary">
                        {primary.label}
                    </button>
                )}
            </div>
        </div>
    );
}

export default Alert;
