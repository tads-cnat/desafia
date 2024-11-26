export default interface Action {
    label: string;
    action: (e?: unknown) => void;
}
